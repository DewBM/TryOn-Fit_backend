import { Request, Response } from "express";
import * as UserService from '../services/UserService';

export async function doSignup(req: Request, res: Response) {
   const body = await req.body;
   console.log(body);
   const result = UserService.addUser(body)
   res.status(200).send()
}