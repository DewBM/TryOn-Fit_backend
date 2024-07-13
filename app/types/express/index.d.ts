import { User as PassportUser } from 'passport';

declare global {
   namespace Express {
      interface User extends PassportUser {
         userId: string,
         email: string,
         username: string,
         role: string
      }
   }
}