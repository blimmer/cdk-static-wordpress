export interface WordpressAdminProps {
  readonly email: string;
  readonly username?: string;
  readonly password?: string; // TODO: or secretsmanager secret
}

export interface WordpressDatabaseProps {
  readonly username?: string;
  readonly password?: string; // TODO: or secretsmanager secret
}
