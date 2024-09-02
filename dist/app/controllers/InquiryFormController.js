"use strict";
// import { Request, Response } from 'express';
// import { createinquiryform } from '../services/InquiryFormService';
Object.defineProperty(exports, "__esModule", { value: true });
exports.doPost = void 0;
const InquiryFormService_1 = require("../services/InquiryFormService");
async function doPost(req, res) {
    const body = req.body;
    console.log(body);
    if (body) {
        // Call the service to create the inquiry form
        const result = await (0, InquiryFormService_1.createinquiryform)(body);
        // Send response based on the success of the operation
        if (result.isSuccess) {
            res.status(201).send({
                isSuccess: true,
                data: result.data,
                msg: "Successfull",
                error: null
            });
        }
        else {
            res.status(500).send({
                isSuccess: false,
                data: null,
                msg: "Invalid request body",
                error: "Request body is missing"
            });
        }
    }
}
exports.doPost = doPost;
// const body = req.body;
// if (body){
//result.isSuccess ? res.status(200).send(result) : res.status(500).send(result);   
////} else {
//res.status(500).send({error: 'Invalid request body'});
//{
// isSuccess: true/false,
// data: null,
// msg: "JFGJK",
// error: "error_object"
// }
