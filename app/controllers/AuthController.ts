import { Request, Response } from "express";
import * as UserService from '../services/UserService';

export async function doSignup(req: Request, res: Response) {
   const body = await req.body;
   console.log(body);
   const result = await UserService.addUser(body);
   if (result)
      res.status(200).send({isSuccess: true, msg: 'signup successful'});
   else
      res.status(409).send({isSuccess: false, msg: 'username already exists.'});
}

export async function doSignin(req: Request, res: Response) {
   const body = req.body;
   const result = await UserService.verifyUser(body);
   if (result)
      res.status(200).send({isSuccess: true, msg: 'login successfull'});
   else
      res.status(401).send({isSuccess: false, msg: 'incorrect username or password'});
}