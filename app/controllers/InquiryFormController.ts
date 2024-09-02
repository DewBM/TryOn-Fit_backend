import { Request, Response } from 'express';
import { createinquiryform } from '../services/InquiryFormService';

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
            error: "Request body is missing"
        });
}

