import { DockerImageAsset } from "aws-cdk-lib/aws-ecr-assets";
import { Construct } from "constructs";
import { join } from "path";

export interface WordpressDockerImageProps {
  /**
   * @default - wordpress:php7.4-apache
   */
  readonly wordpressDockerImageBase?: string;

  /**
   * This configures how much memory is given to Wordpress. It's different than container memory,
   * which is configured by `containerMemory`. See
   * https://developer.wordpress.org/apis/wp-config-php/#increasing-memory-allocated-to-php
   * for details on this setting.
   *
   * @default - 256M
   */
  readonly wordpressMemoryLimit?: string;

  /**
   * Memory to give the ECS container at runtime. See
   * https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-ecs-taskdefinition.html#cfn-ecs-taskdefinition-memory
   * for details on available configurations
   *
   * @default - 512 (MB)
   */
  readonly containerMemory?: number;

  /**
   * The number of vCPU units to give the ECS container at runtime. See
   * https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-ecs-taskdefinition.html#cfn-ecs-taskdefinition-cpu
   * for details on available configurations
   *
   * @default - 256 (0.25 vCPU)
   */
  readonly containerCpu?: number;

  /**
   * @default - 7.1.7
   */
  readonly wp2StaticVersion?: string;

  /**
   * @default - 1.0
   */
  readonly wp2StaticS3AddonVersion?: string;
}

export class WordpressDockerImage extends Construct {
  readonly dockerImageAsset: DockerImageAsset;
  readonly containerCpu: number;
  readonly containerMemory: number;
  readonly wordpressMemoryLimit: string;

  constructor(scope: Construct, id: string, props: WordpressDockerImageProps = {}) {
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
      directory: join(__dirname, "..", "assets", "WordpressDockerImage"),
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
    this.wordpressMemoryLimit = wordpressMemoryLimit;
  }

  private getPhpVersionFromWordpressImage(wordpressDockerImageBase: string): string {
    const phpVersion = wordpressDockerImageBase.match(/wordpress:php(.*)-/);
    if (!phpVersion) {
      throw new Error(`Couldn't infer PHP version from wordpress base image (${wordpressDockerImageBase})`);
    }

    return phpVersion[1];
  }
}
