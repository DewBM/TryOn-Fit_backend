import { Request, Response } from 'express';
import { getInquiryCards } from '../services/InquiryCardsService';


export async function doGet(req: Request, res: Response) {

  try {
    const result = await getInquiryCards();

    if (result.isSuccess) {
      res.status(200).send(result);
    } else {
      res.status(500).send(result);
    }

  } catch (error) {

    res.status(500).send({
      isSuccess: false,
      msg: "Error fetching inquiry stats",
      error: "Data missing",
    });

  }

}
