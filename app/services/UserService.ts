import * as userDAO from '../db/dao/userDAO';
import { genPwdHash } from '../utils/hash';

export async function addUser({username, password}: userDAO.User)  {
   const hash = await genPwdHash(password);
   return userDAO.insert({
      username: username,
      password: hash
   });
}