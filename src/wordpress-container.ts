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
  wordpressMemoryLimit?: string;

  /**
   * @default - 512
   */
  containerMemory?: number;

  /**
   * @default - 256
   */
  containerCpu?: number;

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
  readonly containerCpu: number;
  readonly containerMemory: number;

  constructor(scope: Construct, id: string, props: IWordpressContainerProps = {}) {
    super(scope, id);

    const {
      wordpressMemoryLimit = "256M",
      containerCpu = 256,
      containerMemory = 512,
      wordpressDockerImageBase = "wordpress:php7.4-apache",
      wp2StaticVersion = "7.1.7",
      wp2StaticS3AddonVersion = "1.0",
    } = props;

    this.dockerImageAsset = new DockerImageAsset(this, "DockerAsset", {
      directory: join(__dirname, "wordpress-container"),
      buildArgs: {
        PHP_VERSION: this.getPhpVersionFromWordpressImage(wordpressDockerImageBase),
        BASE_WORDPRESS_IMAGE: wordpressDockerImageBase,
        PHP_INI: `upload_max_filesize=64M
post_max_size=64M
max_execution_time=0
max_input_vars=2000
memory_limit=${wordpressMemoryLimit}`,
        wp2static_version: wp2StaticVersion,
        wp2static_s3_addon_version: wp2StaticS3AddonVersion,
      },
    });

    this.containerCpu = containerCpu;
    this.containerMemory = containerMemory;
  }

  private getPhpVersionFromWordpressImage(wordpressDockerImageBase: string): string {
    const phpVersion = wordpressDockerImageBase.match(/wordpress:php(.*)-/);
    if (!phpVersion) {
      throw new Error(`Couldn't infer PHP version from wordpress base image (${wordpressDockerImageBase})`);
    }

    return phpVersion[1];
  }
}
