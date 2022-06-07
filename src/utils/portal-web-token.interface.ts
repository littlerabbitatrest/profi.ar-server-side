import { JwtPayload } from 'jsonwebtoken';
import { IDecodeToken } from '@app/guards';

export const isPortalWebToken = (token: string | JwtPayload): token is IDecodeToken => {
  if (typeof token !== 'object') return false;
  return 'id' in token && 'role' in token;
};
