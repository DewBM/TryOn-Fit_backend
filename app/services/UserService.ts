import * as userDAO from '../db/dao/userDAO';
import { genPwdHash, verifyHash } from '../utils/hash';
import { Customer ,Address} from '../types/custom_types'; // Adjust the path as needed
import * as addressDAO from '../db/dao/addressDAO';

// export async function addUser({username, password}: userDAO.User)  {
//    const hash = await genPwdHash(password);
//    const result = await userDAO.insert({
//       username: username,
//       password: hash,
//       role: "CUSTOMER"
//    });

//    if(result.length==0) 
//       return false;
//    else
//       return true;
// }


export async function addUser({ username, password }: userDAO.User): Promise<number | null> {
   const hash = await genPwdHash(password); // Hash the password
   const userId = await userDAO.insertUser({
      username: username,
      password: hash,
      role: "CUSTOMER"
   });

   return userId; // Return the userId
}


//////////////////////////////

export async function addCustomerDetails(userId: number, customerDetails: Customer): Promise<number> {
   const customerId = await userDAO.insertCustomer({
      ...customerDetails, 
      userId
   });

   return customerId;  // Assuming result contains the insertedId (customerId)
}

// Service Layer

// export async function addCustomerWithAddress(
//    userId: number,
//    customerDetails: Customer
//  ): Promise<number> {
//    // Insert customer details and retrieve customerId
//    const customerId = await userDAO.insertCustomer({
//      ...customerDetails,
//      userId,
//    });
 
//    if (customerId) {
//      // Prepare the address object (with null values where necessary)
//      const addressObj = {
//       customer_id: customerId,        // Foreign key reference to the Customer table
//       supplier_id: null,              // Nullable field
//       emp_id: null,                   // Nullable field
//       address_line_1: null,           // Nullable field
//       address_line_2: null,           // Nullable field
//       city: null,                     // Nullable field
//       district: null,                 // Nullable field
//       postal_code: null, 
//      };
 
//      const insertedAddressId = await addressDAO.insertAddress(addressObj);

//      if (insertedAddressId) {
//        console.log('Address successfully added with ID:', insertedAddressId);
//      } else {
//        console.error('Failed to insert address');
//      }
//    } else {
//      console.error('Customer insertion failed');
//    }
 
//    return customerId; // Return the generated customerId
//  }

////////////////////

export async function verifyUser({username, password}: userDAO.User) {
   const user = await userDAO.getUserByUsername(username);
   if (user==undefined){
      console.log('incorrect username');
      return {
         isSuccess: false,
         user: null
      };
   }
   else{
      return {
         isSuccess: await verifyHash(password, user.password),
         user: user
      };
   }
}


export async function getUser(userId: number) {
   return await userDAO.getUserById(userId);
}