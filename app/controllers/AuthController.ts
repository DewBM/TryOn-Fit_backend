import { Request, Response } from "express";
import * as UserService from '../services/UserService';
import * as jwtUtils from '../utils/jwtUtils';

// export async function doSignup(req: Request, res: Response) {
//    const body = await req.body;
//    console.log(body);
//    const result = await UserService.addUser(body);
//    if (result)
//       res.status(200).send({isSuccess: true, msg: 'signup successful'});
//    else
//       res.status(409).send({isSuccess: false, msg: 'username already exists.'});
// }
// export async function doSignup(req: Request, res: Response) {
//    const { username, password, firstName, lastName, gender, email, phoneNumber } = req.body;

//    // Add the user
//    const userId = await UserService.addUser({ username, password });

//    if (userId) {
//       // Call addCustomerDetails with customer data excluding customerId
//       await UserService.addCustomerDetails(userId, { 
//          firstName, 
//          lastName, 
//          gender, 
//          email, 
//          phone: phoneNumber,
//          userId // userId is required as a foreign key in the Customer table
//       });

//       res.status(200).send({ isSuccess: true, msg: 'Signup successful' });
//    } else {
//       res.status(409).send({ isSuccess: false, msg: 'Username already exists.' });
//    }
// }


// export async function doSignup(req: Request, res: Response) {
//    const { username, password, firstName, lastName, gender, email, phoneNumber ,address  } = req.body;

//    // Ensure gender and phoneNumber are properly passed as null if not provided
//    const sanitizedGender = gender === "Null" ? null : gender; 
//    const sanitizedPhoneNumber = phoneNumber === "Null" ? null : phoneNumber;

//    // Add the user
//    const userId = await UserService.addUser({ username, password });

//    if (userId) {
//       // Call addCustomerDetails with customer data excluding customerId
//       const customerId = await UserService.addCustomerDetails(userId, { 
//          firstName, 
//          lastName, 
//          gender: sanitizedGender, 
//          email, 
//          phone: sanitizedPhoneNumber,
//          userId // userId is required as a foreign key in the Customer table
//       });

//       res.status(200).send({ isSuccess: true, msg: 'Signup successful' });
//    } else {
//       res.status(409).send({ isSuccess: false, msg: 'Username already exists.' });
//    }
// }


export async function doSignup(req: Request, res: Response) { 
   const { username, password, firstName, lastName, gender, email, phoneNumber } = req.body;

   // Ensure gender and phoneNumber are properly passed as null if not provided
   const sanitizedGender = gender === "Null" ? null : gender; 
   const sanitizedPhoneNumber = phoneNumber === "Null" ? null : phoneNumber;

   // Add the user
   const userId = await UserService.addUser({ username, password });

   if (userId) {
      // Call addCustomerDetails with customer data including userId
      const customerData = { 
         firstName, 
         lastName, 
         gender: sanitizedGender, 
         email, 
         phone: sanitizedPhoneNumber,
         userId  // Include userId here to satisfy the function parameter type
      };

      const customerId = await UserService.addCustomerDetails(userId, customerData);

      res.status(200).send({ isSuccess: true, msg: 'Signup successful' });
   } else {
      res.status(409).send({ isSuccess: false, msg: 'Username already exists.' });
   }
}


export async function doSignin(req: Request, res: Response) {
   const body = req.body;
   const {isSuccess, user} = await UserService.verifyUser(body);
   if (isSuccess && user){
      const token = jwtUtils.generateJWT(user); 
      res.cookie('access-token', token, {sameSite: 'lax', secure: false, maxAge:1000*60*60*24});
      res.status(200).json({isSuccess: true, msg: 'login successfull', role: user.role,user_id:user.userId});
   }
   else
      res.status(401).send({isSuccess: false, msg: 'incorrect username or password'});
}