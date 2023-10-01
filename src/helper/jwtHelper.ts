import jwt, { JwtPayload, Secret } from 'jsonwebtoken';

const createToken = (
  data: Record<string, unknown>,
  secret: Secret,
  expireIn: string,
): string => {
  return jwt.sign(data, secret, {
    expiresIn: expireIn,
  });
};

const verifyToken = (token: string, secret: Secret): JwtPayload => {
  return jwt.verify(token, secret) as JwtPayload;
};

export const jwtHelper = {
  createToken,
  verifyToken,
};
