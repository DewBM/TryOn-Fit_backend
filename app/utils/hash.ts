import bcrypt, { compare, genSalt } from "bcrypt";

export async function genPwdHash(password: string) {
   return await bcrypt.hash(password, 10);
}

export async function verifyHash(password: string, hash: string) {
   return await compare(password, hash);
}