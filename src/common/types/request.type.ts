import { Request } from 'express';
import { RoleEnum } from '@app/role/enums/role.enum';

type JwtPayload = {
  iss?: string | undefined;
  sub?: string | undefined;
  aud?: string | string[] | undefined;
  exp?: number | undefined;
  nbf?: number | undefined;
  iat?: number | undefined;
  jti?: string | undefined;
  roles?: RoleEnum[];
};

export interface AuthRequest extends Request {
  user: JwtPayload;
}
