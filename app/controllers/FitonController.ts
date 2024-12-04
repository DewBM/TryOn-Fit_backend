import { error } from "console";
import { Request, Response } from "express";
import * as FitonService from "../services/FitonService";

// const path = require('path');

export async function userImageUpload(req: Request, res: Response) {
    const user_id = req.user?.userId;


    if (!user_id || typeof user_id !== "number") {
        return res.status(400).json({
            isSuccess: false,
            msg: "Invalid or missing User ID.",
            error: "Invalid or missing User ID."
        });
    }

    if (!req.file) {
        return res.status(400).json({
            isSuccess: false,
            msg: "User image not found.",
            error: "User image not found"
        });
    }

    const filename = req.file!.originalname;

    const result: any = await FitonService.processUserImage(user_id, req.file!.buffer, filename);

    console.log("Image upload response: ", result);

    if (result.isSuccess)
        return res.status(200).json(result);
    else
        return res.status(400).json(result);
}


export async function fiton(req: Request, res: Response) {
    const user_id = String(req.user?.userId);
    const body = req.body;
    const variant_id = body.variant_id

    if (!user_id) {
        return res.status(400).json({
            isSuccess: false,
            msg: "Invalid or missing User ID.",
            error: "Invalid or missing User ID."
        });
    }

    if (!variant_id) {
        return res.status(400).json({
            isSuccess: false,
            msg: "Invalid or missing product variant ID.",
            error: "Invalid or missing product variant ID."
        });
    }

    const result: any = await FitonService.fitonGarment(user_id, variant_id);

    if (result.isSuccess)
        return res.status(200).json(result);
    else 
        return res.status(400).json(result);
}