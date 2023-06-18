// ~~ Generated by projen. To modify, edit .projenrc.ts and run "npx projen".
import { aws_cloudfront } from 'aws-cdk-lib';

/**
 * BehaviorOverrides
 */
export interface BehaviorOverrides {
  /**
   * The protocol that viewers can use to access the files controlled by this behavior.
   * @default ViewerProtocolPolicy.ALLOW_ALL
   * @stability stable
   */
  readonly viewerProtocolPolicy?: aws_cloudfront.ViewerProtocolPolicy;
  /**
   * A list of Key Groups that CloudFront can use to validate signed URLs or signed cookies.
   * @default - no KeyGroups are associated with cache behavior
   * @stability stable
   */
  readonly trustedKeyGroups?: Array<aws_cloudfront.IKeyGroup>;
  /**
   * Set this to true to indicate you want to distribute media files in the Microsoft Smooth Streaming format using this behavior.
   * @default false
   * @stability stable
   */
  readonly smoothStreaming?: boolean;
  /**
   * The response headers policy for this behavior.
   * The response headers policy determines which headers are included in responses
   * @default - none
   * @stability stable
   */
  readonly responseHeadersPolicy?: aws_cloudfront.IResponseHeadersPolicy;
  /**
   * The origin request policy for this behavior.
   * The origin request policy determines which values (e.g., headers, cookies)
   * are included in requests that CloudFront sends to the origin.
   * @default - none
   * @stability stable
   */
  readonly originRequestPolicy?: aws_cloudfront.IOriginRequestPolicy;
  /**
   * The CloudFront functions to invoke before serving the contents.
   * @default - no functions will be invoked
   * @stability stable
   */
  readonly functionAssociations?: Array<aws_cloudfront.FunctionAssociation>;
  /**
   * The Lambda@Edge functions to invoke before serving the contents.
   * @default - no Lambda functions will be invoked
   * @stability stable
   */
  readonly edgeLambdas?: Array<aws_cloudfront.EdgeLambda>;
  /**
   * Whether you want CloudFront to automatically compress certain files for this cache behavior.
   * See https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/ServingCompressedFiles.html#compressed-content-cloudfront-file-types
   * for file types CloudFront will compress.
   * @default true
   * @stability stable
   */
  readonly compress?: boolean;
  /**
   * The cache policy for this behavior.
   * The cache policy determines what values are included in the cache key,
   * and the time-to-live (TTL) values for the cache.
   * @default CachePolicy.CACHING_OPTIMIZED
   * @stability stable
   */
  readonly cachePolicy?: aws_cloudfront.ICachePolicy;
  /**
   * HTTP methods to cache for this behavior.
   * @default CachedMethods.CACHE_GET_HEAD
   * @stability stable
   */
  readonly cachedMethods?: aws_cloudfront.CachedMethods;
  /**
   * HTTP methods to allow for this behavior.
   * @default AllowedMethods.ALLOW_GET_HEAD
   * @stability stable
   */
  readonly allowedMethods?: aws_cloudfront.AllowedMethods;
}
