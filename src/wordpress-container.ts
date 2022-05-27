import { DockerImageAsset } from "aws-cdk-lib/aws-ecr-assets";
import { Construct } from "constructs";
import { join } from "path";

export interface IWordpressContainerProps {
  /**
   * @default - wordpress:php7.4-apache
   */
  wordpressDockerImageBase?: string;

  /**
   * @default - 256M
   */
  containerMemory?: string;

  /**
   * @default - 7.1.7
   */
  wp2StaticVersion?: string;

  /**
   * @default - 1.0
   */
  wp2StaticS3AddonVersion?: string;
}

export class WordpressContainer extends Construct {
  readonly dockerImageAsset: DockerImageAsset;

  constructor(scope: Construct, id: string, props: IWordpressContainerProps = {}) {
    super(scope, id);

    const {
      containerMemory = "256M",
      wordpressDockerImageBase = "wordpress:php7.4-apache",
      wp2StaticVersion = "7.1.7",
      wp2StaticS3AddonVersion = "1.0",
    } = props;

    this.dockerImageAsset = new DockerImageAsset(this, "DockerAsset", {
      directory: join(__dirname, "wordpress-container"),
      buildArgs: {
        BASE_WORDPRESS_IMAGE: wordpressDockerImageBase,
        PHP_INI: `upload_max_filesize=64M
post_max_size=64M
max_execution_time=0
max_input_vars=2000
memory_limit=${containerMemory}`,
        wp2static_version: wp2StaticVersion,
        wp2static_s3_addon_version: wp2StaticS3AddonVersion,
      },
    });
  }
}
