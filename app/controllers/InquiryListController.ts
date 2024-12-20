import { Request, Response } from 'express';
import { getinquirylist } from '../services/InquiryListService';




export async function doGet(req: Request , res: Response){
    // const body = req.body;
    // console.log(body);

    
    try {

        const result = await getinquirylist();
        console.log(result); 

        res.status(201).send(result);

    } catch (error) {
        
        res.status(500).send({
            isSuccess: false,
            data: null,
            msg: "Failed to fetch inquiry list from the database",
            error: error,
     }
     );
        
    }


    // if (body.inquiry_id) {
        
    //     const result = await getinquirylist();

    
    //     if (result.isSuccess) {
    //         res.status(201).send(result);
    //         console.log(result);
    //         } 
    //     else {
    //         res.status(500).send(result);
    //     } 
    // }
    // else
    //     res.status(500).send({
    //         isSuccess: false,
    //         data: null,
    //         msg: "Invalid request body",
    //         error: "Request body is missing"
    //     });
}

