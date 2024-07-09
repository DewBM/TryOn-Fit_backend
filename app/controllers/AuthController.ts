import { Request, Response } from "express";
import * as UserService from '../services/UserService';

export async function doSignup(req: Request, res: Response) {
   const body = await req.body;
   console.log(body);
   const result = UserService.addUser(body)
   res.status(200).send()
}

export async function doSignin(req: Request, res: Response) {
   const body = req.body;
   const result = await UserService.verifyUser(body);
   if (result)
      res.status(200).send('login successfull');
   else
      res.status(401).send('incorrect username or password');
}