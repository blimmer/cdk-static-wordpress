import { RemovalPolicy } from "aws-cdk-lib";
import { DnsValidatedCertificate } from "aws-cdk-lib/aws-certificatemanager";
import {
  BehaviorOptions,
  Distribution,
  DistributionProps,
  Function,
  FunctionCode,
  FunctionEventType,
  PriceClass,
  ViewerProtocolPolicy,
} from "aws-cdk-lib/aws-cloudfront";
import { S3Origin } from "aws-cdk-lib/aws-cloudfront-origins";
import { AaaaRecord, ARecord, IHostedZone, RecordTarget } from "aws-cdk-lib/aws-route53";
import { CloudFrontTarget } from "aws-cdk-lib/aws-route53-targets";
import { BlockPublicAccess, Bucket, BucketEncryption, BucketProps, ObjectOwnership } from "aws-cdk-lib/aws-s3";
import { Construct } from "constructs";

export interface StaticHostingProps {
  siteId: string;
  fullyQualifiedSiteName: string;
  hostedZone: IHostedZone;
  redirects?: SiteRedirects;

  bucketOverrides?: BucketProps;
  distributionOverrides?: DistributionProps;
  s3OriginBehaviorOverrides?: BehaviorOptions;
}

export type SiteRedirects = Record<string, string>;

export class StaticHosting extends Construct {
  readonly bucket: Bucket;
  readonly distribution: Distribution;

  constructor(scope: Construct, id: string, props: StaticHostingProps) {
    super(scope, id);
    const {
      siteId,
      fullyQualifiedSiteName,
      hostedZone,
      redirects = {
        "^(.*)index.php$": "$1",
      },
      bucketOverrides,
      distributionOverrides,
      s3OriginBehaviorOverrides,
    } = props;

    const bucket = new Bucket(this, "Bucket", {
      bucketName: fullyQualifiedSiteName,
      encryption: BucketEncryption.S3_MANAGED,
      removalPolicy: RemovalPolicy.DESTROY,
      autoDeleteObjects: true,
      blockPublicAccess: BlockPublicAccess.BLOCK_ALL,
      objectOwnership: ObjectOwnership.OBJECT_WRITER,
      ...bucketOverrides,
    });

    const sslCert = new DnsValidatedCertificate(this, "SslCertificate", {
      domainName: fullyQualifiedSiteName,
      hostedZone,
      region: "us-east-1",
    });

    const distribution = new Distribution(this, "Distribution", {
      defaultBehavior: {
        origin: new S3Origin(bucket),
        viewerProtocolPolicy: ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
        functionAssociations: [
          {
            function: new Function(this, "ViewerRequestFunction", {
              functionName: `${siteId}-redirect`,
              code: FunctionCode.fromInline(`
function handler(event) {
  var request = event.request;
  var uri = request.uri;

  try {
      ${this.generateRedirectStatements(redirects)}

      // Check whether the URI is missing a file name.
      if (uri.endsWith('/')) {
          request.uri += 'index.html';
          return request;
      }
  }
  catch (e) {
      // console.error is not supported
      console.log(e);
  }

  return request;
}

function permanentRedirect(uri, match, target) {
  return {
      statusCode: 301,
      statusDescription: 'Moved Permanently',
      headers: {
          'location': { value: uri.replace(match, target) }
      }
  };
}
              `),
            }),
            eventType: FunctionEventType.VIEWER_REQUEST,
          },
        ],
        ...s3OriginBehaviorOverrides,
      },
      comment: `Serves ${fullyQualifiedSiteName}`,
      certificate: sslCert,
      domainNames: [fullyQualifiedSiteName],
      defaultRootObject: "index.html",
      priceClass: PriceClass.PRICE_CLASS_ALL,
      // TODO: waf support
      ...distributionOverrides,
    });

    new ARecord(this, "ARecord", {
      recordName: fullyQualifiedSiteName,
      zone: hostedZone,
      target: RecordTarget.fromAlias(new CloudFrontTarget(distribution)),
    });
    new AaaaRecord(this, "AaaaRecord", {
      recordName: fullyQualifiedSiteName,
      zone: hostedZone,
      target: RecordTarget.fromAlias(new CloudFrontTarget(distribution)),
    });

    this.bucket = bucket;
    this.distribution = distribution;
  }

  private generateRedirectStatements(redirects: SiteRedirects): string {
    let code = "";
    for (const redirect in redirects) {
      code += `
    if (/${redirect}/.test(uri)) {
      return permanentRedirect(uri, /${redirect}/, '${redirects[redirect]}');
    }
`;
    }
    return code;
  }
}
