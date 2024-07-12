import * as userDAO from '../db/dao/userDAO';
import { genPwdHash, verifyHash } from '../utils/hash';

export async function addUser({username, password}: userDAO.User)  {
   const hash = await genPwdHash(password);
   const result = await userDAO.insert({
      username: username,
      password: hash
   });

   if(result.length==0) 
      return false;
   else
      return true;
}


export async function verifyUser({username, password}: userDAO.User) {
   const user = await userDAO.getUserById(username);
   if (user==undefined){
      console.log('incorrect username');
      return false;
   }
   else
      return await verifyHash(password, user.password);
}