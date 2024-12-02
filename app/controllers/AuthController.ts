import { Request, Response } from "express";
import * as UserService from '../services/UserService';
import * as jwtUtils from '../utils/jwtUtils';

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
   const {isSuccess, user} = await UserService.verifyUser(body);
   if (isSuccess && user){
      const token = jwtUtils.generateJWT(user); 
      res.cookie('access-token', token, {sameSite: 'lax', secure: false, maxAge:1000*60*60*24});
      res.status(200).json({isSuccess: true, msg: 'login successfull', role: user.role});
   }
   else
      res.status(401).send({isSuccess: false, msg: 'incorrect username or password'});
}