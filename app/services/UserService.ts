import * as userDAO from '../db/dao/userDAO';
import { genPwdHash, verifyHash } from '../utils/hash';

export async function addUser({username, password}: userDAO.User)  {
   const hash = await genPwdHash(password);
   return userDAO.insert({
      username: username,
      password: hash
   });
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