// ~~ Generated by projen. To modify, edit .projenrc.js and run "npx projen".
import { aws_ecs, Duration } from 'aws-cdk-lib';

/**
 * ContainerOverrides
 */
export interface ContainerOverrides {
  /**
   * The working directory in which to run commands inside the container.
   * @default /
   * @stability stable
   */
  readonly workingDirectory?: string;
  /**
   * The user name to use inside the container.
   * @default root
   * @stability stable
   */
  readonly user?: string;
  /**
   * A list of namespaced kernel parameters to set in the container.
   * @default - No system controls are set.
   * @stability stable
   */
  readonly systemControls?: Array<aws_ecs.SystemControl>;
  /**
   * Time duration (in seconds) to wait before the container is forcefully killed if it doesn't exit normally on its own.
   * @default - none
   * @stability stable
   */
  readonly stopTimeout?: Duration;
  /**
   * Time duration (in seconds) to wait before giving up on resolving dependencies for a container.
   * @default - none
   * @stability stable
   */
  readonly startTimeout?: Duration;
  /**
   * The secret environment variables to pass to the container.
   * @default - No secret environment variables.
   * @stability stable
   */
  readonly secrets?: Record<string, aws_ecs.Secret>;
  /**
   * When this parameter is true, the container is given read-only access to its root file system.
   * @default false
   * @stability stable
   */
  readonly readonlyRootFilesystem?: boolean;
  /**
   * Specifies whether the container is marked as privileged.
   * When this parameter is true, the container is given elevated privileges on the host container instance (similar to the root user).
   * @default false
   * @stability stable
   */
  readonly privileged?: boolean;
  /**
   * The port mappings to add to the container definition.
   * @default - No ports are mapped.
   * @stability stable
   */
  readonly portMappings?: Array<aws_ecs.PortMapping>;
  /**
   * The soft limit (in MiB) of memory to reserve for the container.
   * When system memory is under heavy contention, Docker attempts to keep the
   * container memory to this soft limit. However, your container can consume more
   * memory when it needs to, up to either the hard limit specified with the memory
   * parameter (if applicable), or all of the available memory on the container
   * instance, whichever comes first.
   *
   * At least one of memoryLimitMiB and memoryReservationMiB is required for non-Fargate services.
   * @default - No memory reserved.
   * @stability stable
   */
  readonly memoryReservationMiB?: number;
  /**
   * The amount (in MiB) of memory to present to the container.
   * If your container attempts to exceed the allocated memory, the container
   * is terminated.
   *
   * At least one of memoryLimitMiB and memoryReservationMiB is required for non-Fargate services.
   * @default - No memory limit.
   * @stability stable
   */
  readonly memoryLimitMiB?: number;
  /**
   * The log configuration specification for the container.
   * @default - Containers use the same logging driver that the Docker daemon uses.
   * @stability stable
   */
  readonly logging?: aws_ecs.LogDriver;
  /**
   * Linux-specific modifications that are applied to the container, such as Linux kernel capabilities.
   * For more information see [KernelCapabilities](https://docs.aws.amazon.com/AmazonECS/latest/APIReference/API_KernelCapabilities.html).
   * @default - No Linux parameters.
   * @stability stable
   */
  readonly linuxParameters?: aws_ecs.LinuxParameters;
  /**
   * The inference accelerators referenced by the container.
   * @default - No inference accelerators assigned.
   * @stability stable
   */
  readonly inferenceAcceleratorResources?: Array<string>;
  /**
   * The hostname to use for your container.
   * @default - Automatic hostname.
   * @stability stable
   */
  readonly hostname?: string;
  /**
   * The health check command and associated configuration parameters for the container.
   * @default - Health check configuration from container.
   * @stability stable
   */
  readonly healthCheck?: aws_ecs.HealthCheck;
  /**
   * The number of GPUs assigned to the container.
   * @default - No GPUs assigned.
   * @stability stable
   */
  readonly gpuCount?: number;
  /**
   * A list of hostnames and IP address mappings to append to the /etc/hosts file on the container.
   * @default - No extra hosts.
   * @stability stable
   */
  readonly extraHosts?: Record<string, string>;
  /**
   * Specifies whether the container is marked essential.
   * If the essential parameter of a container is marked as true, and that container fails
   * or stops for any reason, all other containers that are part of the task are stopped.
   * If the essential parameter of a container is marked as false, then its failure does not
   * affect the rest of the containers in a task. All tasks must have at least one essential container.
   *
   * If this parameter is omitted, a container is assumed to be essential.
   * @default true
   * @stability stable
   */
  readonly essential?: boolean;
  /**
   * The environment files to pass to the container.
   * @default - No environment files.
   * @stability stable
   */
  readonly environmentFiles?: Array<aws_ecs.EnvironmentFile>;
  /**
   * The environment variables to pass to the container.
   * @default - No environment variables.
   * @stability stable
   */
  readonly environment?: Record<string, string>;
  /**
   * The ENTRYPOINT value to pass to the container.
   * @default - Entry point configured in container.
   * @stability stable
   */
  readonly entryPoint?: Array<string>;
  /**
   * A list of strings to provide custom labels for SELinux and AppArmor multi-level security systems.
   * @default - No security labels.
   * @stability stable
   */
  readonly dockerSecurityOptions?: Array<string>;
  /**
   * A key/value map of labels to add to the container.
   * @default - No labels.
   * @stability stable
   */
  readonly dockerLabels?: Record<string, string>;
  /**
   * A list of DNS servers that are presented to the container.
   * @default - Default DNS servers.
   * @stability stable
   */
  readonly dnsServers?: Array<string>;
  /**
   * A list of DNS search domains that are presented to the container.
   * @default - No search domains.
   * @stability stable
   */
  readonly dnsSearchDomains?: Array<string>;
  /**
   * Specifies whether networking is disabled within the container.
   * When this parameter is true, networking is disabled within the container.
   * @default false
   * @stability stable
   */
  readonly disableNetworking?: boolean;
  /**
   * The minimum number of CPU units to reserve for the container.
   * @default - No minimum CPU units reserved.
   * @stability stable
   */
  readonly cpu?: number;
  /**
   * The name of the container.
   * @default - id of node associated with ContainerDefinition.
   * @stability stable
   */
  readonly containerName?: string;
  /**
   * The command that is passed to the container.
   * If you provide a shell command as a single string, you have to quote command-line arguments.
   * @default - CMD value built into container image.
   * @stability stable
   */
  readonly command?: Array<string>;
  /**
   * The image used to start a container.
   * This string is passed directly to the Docker daemon.
   * Images in the Docker Hub registry are available by default.
   * Other repositories are specified with either repository-url/image:tag or repository-url/image@digest.
   * TODO: Update these to specify using classes of IContainerImage
   * @stability stable
   */
  readonly image?: aws_ecs.ContainerImage;
}
