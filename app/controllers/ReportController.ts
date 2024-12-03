import { Request, Response } from 'express';
import { getRevenueBySupplier } from '../services/ReportService';
import express from 'express';


export async function doGet(req:Request,resp: Response) {
    console.log("339933")
    const startDate = req.query.startDate as unknown as Date;
    const endDate = req.query.endDate as unknown as Date;

    const filterdata = {startDate,endDate};
    console.log(filterdata);
    try {
        console.log("1")
        const data = await getRevenueBySupplier(filterdata);
        
        const suppliersArray = data.map((item: { supplier: string | null }) => item.supplier ?? "Unknown");
        const totalRevenueBySupplierArray = data.map((item:{totalRevenue : number})=> item.totalRevenue);

        if (!Array.isArray(data)) {
            return resp.status(500).send({ error: "Invalid data received from service" });
        }

        const responseData = {
            suppliers: suppliersArray,
            revenues: totalRevenueBySupplierArray,
        };
       
        console.log(responseData);
        resp.status(201).send({ responseData });

        // console.log(suppliersArray,totalRevenueBySupplierArray);
        // resp.status(201).send({ suppliersArray, totalRevenueBySupplierArray });
    } catch (error) {
        resp.status(500).send({error : "Faild to get revenue"})
    }
    
}

