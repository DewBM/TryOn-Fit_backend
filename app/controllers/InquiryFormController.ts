import { Request, Response } from 'express';
import { createinquiryform } from '../services/InquiryFormService';
import { getinquiryform } from '../services/InquiryFormService';
import { updateInquiryForm } from '../services/InquiryFormService';
import { deleteInquiryForm } from '../services/InquiryFormService';

export async function doPost(req: Request, res: Response) { ``
    const body = req.body;
    

    if (body) {
        const result = await createinquiryform(body);

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


export async function doPut(req: Request , res: Response){
    const { inquiry_id , solution, status} = req.body;

    if(inquiry_id && solution){
        try{
            const result =  await updateInquiryForm(inquiry_id, solution ,status);

            if (result.isSuccess){
                res.status(201).send(result);
            }
            else{
                res.status(500).send(result);
            }
        }
        catch(error){
            res.status(500).send({
                isSucces: false,
                msg: "Server Error",
                error: "Server Error"
            });
        }
        
    }
    else{
        res.status(400).send({
            isSuccess: false,
            msg: "Missing inquiry_id or solution",
            error: "Missing inquiry_id or solution"
        });
    }
}


export async function doDel(req: Request, res:Response){
    const {id} = req.body;
    if(id){
        
        try{
            const result = await deleteInquiryForm(id);
            if(result.isSuccess){
                res.status(201).send(result);
            }
            else{
                res.status(500).send(result);
            }
        }
        catch(error){
            res.status(500).send({
                isSuccess: false,
                msg: "Server Error",
                error: "Server Error"
            });
        }
    }
    else{
        res.status(400).send({
            isSuccess: false,
            msg: "Missing inquiry_id",
            error: "Missing inquiry_id"
        });
    }

}

