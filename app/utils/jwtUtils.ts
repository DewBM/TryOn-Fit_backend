import jwt, { Jwt } from 'jsonwebtoken';
import crypto from 'crypto';
import { TypeUser } from '../db/dao/userDAO';

export const secretKey = crypto.randomBytes(64).toString('hex');

export const generateJWT = (user: TypeUser) => {
   const payload = {
      iat: Date.now(),
      sub: user.userId,
      username: user.username,
      // email: user.email,
      // role: user.role
   };

   return jwt.sign(payload, secretKey, {expiresIn: '1h', algorithm: 'HS256'});
}