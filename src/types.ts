export interface WordpressAdminProps {
  email: string;
  username?: string;
  password?: string; // TODO: or secretsmanager secret
}

export interface WordpressDatabaseProps {
  username?: string;
  password?: string; // TODO: or secretsmanager secret
}
