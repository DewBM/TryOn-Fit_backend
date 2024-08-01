import * as userDAO from '../db/dao/userDAO';
import { genPwdHash, verifyHash } from '../utils/hash';

export async function addUser({username, password}: userDAO.User)  {
   const hash = await genPwdHash(password);
   const result = await userDAO.insert({
      username: username,
      password: hash,
      role: "CUSTOMER"
   });

   if(result.length==0) 
      return false;
   else
      return true;
}


export async function verifyUser({username, password}: userDAO.User) {
   const user = await userDAO.getUserByUsername(username);
   if (user==undefined){
      console.log('incorrect username');
      return {
         isSuccess: false,
         user: null
      };
   }
   else{
      return {
         isSuccess: await verifyHash(password, user.password),
         user: user
      };
   }
}


export async function getUser(userId: number) {
   return await userDAO.getUserById(userId);
}