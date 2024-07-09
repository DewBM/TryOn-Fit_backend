import bcrypt, { genSalt } from "bcrypt";

export async function genPwdHash(password: string) {
   // const salt = await genSalt(10);
   const hash = await bcrypt.hash(password, 10);

   return hash;
}