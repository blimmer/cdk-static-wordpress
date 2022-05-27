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
import { IHostedZone } from "aws-cdk-lib/aws-route53";
import { BlockPublicAccess, Bucket, BucketEncryption, BucketProps } from "aws-cdk-lib/aws-s3";
import { Construct } from "constructs";

export interface IStaticWordpressHostingProps {
  fullyQualifiedSiteName: string;
  hostedZone: IHostedZone;
  redirects?: ISiteRedirects;

  bucketOverrides?: BucketProps;
  distributionOverrides?: DistributionProps;
  s3OriginBehaviorOverrides?: BehaviorOptions;
}

export type ISiteRedirects = Record<string, string>;

export class StaticWordpressHosting extends Construct {
  readonly bucket: Bucket;
  readonly distribution: Distribution;

  constructor(scope: Construct, id: string, props: IStaticWordpressHostingProps) {
    super(scope, id);
    const {
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
      blockPublicAccess: BlockPublicAccess.BLOCK_ALL,
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

    this.bucket = bucket;
    this.distribution = distribution;
  }

  private generateRedirectStatements(redirects: ISiteRedirects): string {
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
