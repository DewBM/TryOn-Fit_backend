import { Request, Response } from 'express';
import { getCostbyMonth, getCostbyYear, getCostySupplier, getProfitbyMonth, getProfitBySupplier, getProfitbyYear, getRevenuebyMonth, getRevenueBySupplier, getRevenuebyYear } from '../services/ReportService';
import express from 'express';


export async function doGet(req:Request,resp: Response) {
    console.log("339933")
    // const startDate = req.query.startDate as unknown as Date;
    // const endDate = req.query.endDate as unknown as Date;
    // const filterdata = {startDate, endDate};
    // console.log(month,year,selectionType,startDate,endDate);
    // const month = req.query.month as unknown as string;
    const selectionType = req.query.selectionType as unknown as string;
    const year = req.query.year as unknown as string;
    const reportType = req.query.reportType as unknown as string;
    switch (reportType) {
        case "Revenue by Supplier":
            switch (selectionType) {
                case "date":
                    try {
                        const startDate = req.query.startDate as unknown as Date;
                        const endDate = req.query.endDate as unknown as Date;
                        const filterdata = {startDate, endDate};
                        console.log("1")
                        
                        const data = await getRevenueBySupplier(filterdata);
                        
                        const suppliersArray = data.map((item: { supplier: string | null }) => item.supplier ?? "Unknown");
                        const totalRevenueBySupplierArray = data.map((item:{totalRevenue : number})=> item.totalRevenue);
                
                        if (!Array.isArray(data)) {
                            return resp.status(400).send({ error: "Invalid data received from service" });
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
                        resp.status(400).send({error : "Faild to get revenue"})
                    }
                    break;
                case "month":
                    console.log("2month")
                    try {
                        const month = req.query.month as unknown as string;
                        console.log("1")
                        const data = await getRevenuebyMonth(month,year);
                        const suppliersArray = data.map((item: { supplier: string | null }) => item.supplier ?? "Unknown");
                        const totalRevenueBySupplierArray = data.map((item:{totalRevenue : number})=> item.totalRevenue);
                
                        if (!Array.isArray(data)) {
                            return resp.status(400).send({ error: "Invalid data received from service" });
                        }
                
                        const responseMonthlyData = {
                            suppliers: suppliersArray,
                            revenues: totalRevenueBySupplierArray,
                        };
                       
                        console.log(responseMonthlyData);
                        resp.status(201).send({ responseMonthlyData });
                        
                        
                    } catch (error) {
                        resp.status(400).send({error : "Faild to get revenue"})
                    }
                    break;
                case "year":
                    console.log("1year")
                    try {
                        console.log("1")
                        const data = await getRevenuebyYear(year);
                        const suppliersArray = data.map((item: { supplier: string | null }) => item.supplier ?? "Unknown");
                        const totalRevenueBySupplierArray = data.map((item:{totalRevenue : number})=> item.totalRevenue);
                
                        if (!Array.isArray(data)) {
                            return resp.status(400).send({ error: "Invalid data received from service" });
                        }
                
                        const responseMyearlyData = {
                            suppliers: suppliersArray,
                            revenues: totalRevenueBySupplierArray,
                        };
                       
                        console.log(responseMyearlyData);
                        resp.status(201).send({ responseMyearlyData });
                        
                        
                        
                    } catch (error) {
                        resp.status(400).send({error : "Faild to get revenue"})
                    }
        
                    break;
        
                    
            
            
                }
            // console.log("revenue")
            
            break;
        case "Cost of Goods by Supplier":
            switch (selectionType) {
                case "date":
                    try {
                        const startDate = req.query.startDate as unknown as Date;
                        const endDate = req.query.endDate as unknown as Date;
                        const filterdata = {startDate, endDate};
                        console.log("1")
                        
                        const data = await getCostySupplier(filterdata);
                        
                        const suppliersArray = data.map((item: { supplier: string | null }) => item.supplier ?? "Unknown");
                        const totalRevenueBySupplierArray = data.map((item:{totalRevenue : number})=> item.totalRevenue);
                
                        if (!Array.isArray(data)) {
                            return resp.status(400).send({ error: "Invalid data received from service" });
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
                        resp.status(400).send({error : "Faild to get revenue"})
                    }
                    break;
                case "month":
                    console.log("2month")
                    try {
                        const month = req.query.month as unknown as string;
                        console.log("1")
                        const data = await getCostbyMonth(month,year);
                        const suppliersArray = data.map((item: { supplier: string | null }) => item.supplier ?? "Unknown");
                        const totalRevenueBySupplierArray = data.map((item:{totalRevenue : number})=> item.totalRevenue);
                
                        if (!Array.isArray(data)) {
                            return resp.status(400).send({ error: "Invalid data received from service" });
                        }
                
                        const responseMonthlyData = {
                            suppliers: suppliersArray,
                            revenues: totalRevenueBySupplierArray,
                        };
                       
                        console.log(responseMonthlyData);
                        resp.status(201).send({ responseMonthlyData });
                        
                        
                    } catch (error) {
                        resp.status(400).send({error : "Faild to get revenue"})
                    }
                    break;
                case "year":
                    console.log("1year")
                    try {
                        console.log("1")
                        const data = await getCostbyYear(year);
                        const suppliersArray = data.map((item: { supplier: string | null }) => item.supplier ?? "Unknown");
                        const totalRevenueBySupplierArray = data.map((item:{totalRevenue : number})=> item.totalRevenue);
                
                        if (!Array.isArray(data)) {
                            return resp.status(400).send({ error: "Invalid data received from service" });
                        }
                
                        const responseMyearlyData = {
                            suppliers: suppliersArray,
                            revenues: totalRevenueBySupplierArray,
                        };
                       
                        console.log(responseMyearlyData);
                        resp.status(201).send({ responseMyearlyData });
                        
                        
                        
                    } catch (error) {
                        resp.status(400).send({error : "Faild to get revenue"})
                    }
        
                    break;
        
                    
            
            
                }
            console.log("revenue")
            
            break;
        case "Profit or Losses by Supplier":
            switch (selectionType) {
                case "date":
                    try {
                        const startDate = req.query.startDate as unknown as Date;
                        const endDate = req.query.endDate as unknown as Date;
                        const filterdata = {startDate, endDate};
                        console.log("1")
                        
                        const data = await getProfitBySupplier(filterdata);
                        
                        const suppliersArray = data.map((item: { supplier: string | null }) => item.supplier ?? "Unknown");
                        const totalRevenueBySupplierArray = data.map((item:{totalRevenue : number})=> item.totalRevenue);
                
                        if (!Array.isArray(data)) {
                            return resp.status(400).send({ error: "Invalid data received from service" });
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
                        resp.status(400).send({error : "Faild to get revenue"})
                    }
                    break;
                case "month":
                    console.log("2month")
                    try {
                        const month = req.query.month as unknown as string;
                        console.log("1")
                        const data = await getProfitbyMonth(month,year);
                        const suppliersArray = data.map((item: { supplier: string | null }) => item.supplier ?? "Unknown");
                        const totalRevenueBySupplierArray = data.map((item:{totalRevenue : number})=> item.totalRevenue);
                
                        if (!Array.isArray(data)) {
                            return resp.status(400).send({ error: "Invalid data received from service" });
                        }
                
                        const responseMonthlyData = {
                            suppliers: suppliersArray,
                            revenues: totalRevenueBySupplierArray,
                        };
                       
                        console.log(responseMonthlyData);
                        resp.status(201).send({ responseMonthlyData });
                        
                        
                    } catch (error) {
                        resp.status(400).send({error : "Faild to get revenue"})
                    }
                    break;
                case "year":
                    console.log("1year")
                    try {
                        console.log("1")
                        const data = await getProfitbyYear(year);
                        const suppliersArray = data.map((item: { supplier: string | null }) => item.supplier ?? "Unknown");
                        const totalRevenueBySupplierArray = data.map((item:{totalRevenue : number})=> item.totalRevenue);
                
                        if (!Array.isArray(data)) {
                            return resp.status(400).send({ error: "Invalid data received from service" });
                        }
                
                        const responseMyearlyData = {
                            suppliers: suppliersArray,
                            revenues: totalRevenueBySupplierArray,
                        };
                       
                        console.log(responseMyearlyData);
                        resp.status(201).send({ responseMyearlyData });
                        
                        
                        
                    } catch (error) {
                        resp.status(400).send({error : "Faild to get revenue"})
                    }
        
                    break;
        
                    
            
            
                }
            
            
            break;

            // console.log("product")
            break;
    }
    
    
}

