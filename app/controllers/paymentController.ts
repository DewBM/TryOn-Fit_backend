


import { Request, Response } from "express";
import generatePayHereHash from "../utils/Secretekey";

export async function doPost(req:Request, res:Response) {
    try {
       
      

        const merchantId = '1228889';
const orderId = '12345';
const amount = 1000;
const currency = 'LKR';
const merchantSecret = 'cgdtgfjgmgsyflgbvjdsefshgkjnmnkjngfsfxcgh';

const hash = generatePayHereHash(merchantId, orderId, amount, currency, merchantSecret);
console.log('Generated Hash:', hash);


        // Validate the required fields
    //     if (!merchantId || !merchantSecret || !orderId || !totalAmount || !currency) {
    //         return res.status(400).send({ error: "Missing required fields" });
    //     }

    //     // Generate the hash code
    //   const hash = generatePayHereHash(orderId, totalAmount, merchantSecret, merchantId, currency);;

        // Send the generated hash as the response
        // return res.status(201).send({ hash });
    } catch (error) {
        console.error("Error generating hash:", error);
        return res.status(500).send({ error: "Failed to generate hash" });
    }
}