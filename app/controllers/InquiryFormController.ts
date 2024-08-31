import { Request, Response } from 'express';
import { createinquiryform } from '../services/InquiryFormService';



export async function doPost(req: Request, resp: Response) {
    try {
        const data = await createinquiryform(req.body);
        resp.status(201).send(data);
    } catch (error) {
        resp.status(500).send({ error: 'Failed to pass details' });
    }
}
