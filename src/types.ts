export interface WordpressAdminProps {
  readonly email: string;
  readonly username?: string;
  readonly password?: string; // TODO: or secretsmanager secret

  /**
   * Enables ECS Exec (https://docs.aws.amazon.com/AmazonECS/latest/developerguide/ecs-exec.html). You can use
   * this to access the container running the Wordpress admin console.
   *
   * NOTE: If you enable toggle this flag for an already-running WP Admin site, you'll need to manually stop the
   * existing task. The ECS service will replace the task with a new one that has ECS Exec enabled. This is a
   * CloudFormation limitation.
   *
   * @default false
   */
  readonly enableEcsExec?: boolean;
}

export interface WordpressDatabaseProps {
  readonly username?: string;
  readonly password?: string; // TODO: or secretsmanager secret
}
