import jwt, { Jwt } from 'jsonwebtoken';
import crypto from 'crypto';
import { TypeUser } from '../db/dao/userDAO';
import { Request } from 'express';

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


export function cookieExtracotr(req: Request) {
   if (req && req.cookies) {
      return req.cookies['access-token'];
   }
   else
      return null;
}