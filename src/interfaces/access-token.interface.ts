export interface AccessToken {
  aud: string;
  jti: string;
  iat: number;
  nbf: number;
  exp: number;
  sub: string | number;
  account_id: number;
  base_domain: string;
  scopes: string[];
}
