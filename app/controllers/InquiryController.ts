import { Request, Response } from 'express';
import { getinquirylist } from '../services/InquiryService';



export async function doGet(req: Request , res: Response){
    const body = req.body;
    console.log(body);

    if (body) {
        
        const result = await getinquirylist();

    
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