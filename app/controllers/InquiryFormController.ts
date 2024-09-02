import { Request, Response } from 'express';
import { createinquiryform } from '../services/InquiryFormService';
import { getinquiryform } from '../services/InquiryFormService';

export async function doPost(req: Request, res: Response) {
    const body = req.body;
    // console.log(body);

    if (body) {
        // Call the service to create the inquiry form
        const result = await createinquiryform(body);

        // Send response based on the success of the operation
        if (result.isSuccess) {
            res.status(201).send(result);
            } 
        else {
            res.status(500).send(result);
        } 
    }
    else
        res.status(500).send({
            isSuccess: false,
            data: null,
            msg: "Invalid request body",
            error: "Sent body is missing"
        });
}

export async function doGet(req: Request , res: Response){
    const body = req.body;
    //console.log(body);

    if (body) {
        
        const result = await getinquiryform();

       
        if (result.isSuccess) {
            res.status(201).send(result);
            console.log(result);
            } 
        else {
            res.status(500).send(result);
        } 
    }
    else
        res.status(500).send({
            isSuccess: false,
            data: null,
            msg: "Invalid request body",
            error: "Request body is missing"
        });
}

