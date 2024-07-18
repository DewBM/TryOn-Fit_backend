import { Strategy as JwtStrategy, ExtractJwt, StrategyOptions } from 'passport-jwt';
import passport from 'passport';
import { cookieExtracotr, secretKey } from '../utils/jwtUtils';
import * as UserService from '../services/UserService';
import { NextFunction, Request, Response } from 'express';


const options: StrategyOptions = {
   // jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
   jwtFromRequest: cookieExtracotr,
   secretOrKey: secretKey,
   algorithms: ['HS256']
};

passport.use(
   new JwtStrategy(options, async (jwtPayload, done) => {
      try {
         const user = await UserService.getUser(jwtPayload.sub);
         if (user)
            return done(null, user);
         else
            return done(null, false);
      }
      catch (error){
         return done(error, false);
      }
   })
);

export const passporthMiddleware = passport.authenticate('jwt', { session: false });

export const authenticate = (roles: string[]) => {
   return (req: Request, res: Response, next: NextFunction) => {
      const user = req.user;

      if (user && roles.includes(user.role))
         return next();
      else
         return res.status(401).json({isSuccess: false, msg: 'Access forbidden: insufficient rights'});
   };
}