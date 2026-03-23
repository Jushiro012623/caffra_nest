import {User} from "@app/user/entities/user.entity";

export type AccessToken = {
  access_token: string;
  token_type: string;
};

export type JwtPayload = {
  iss?: string;
  sub?: string;
  aud?: string | string[];
  exp?: number;
  nbf?: number;
  iat?: number;
  jti?: string;

  roles?: string[];
  permissions?: string[];
};

