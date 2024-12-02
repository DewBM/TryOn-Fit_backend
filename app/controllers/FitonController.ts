import { error } from "console";
import { Request, Response } from "express";
import { processUserImage } from "../services/FitonService";

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

    const result: any = await processUserImage(user_id, req.file!.buffer, filename);

    console.log("Image upload response: ", result);

    if (result.isSuccess)
        return res.status(200).json(result);
    else
        return res.status(400).json(result);
}