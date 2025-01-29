import { get } from "http"
import {getEmployeeCount} from "../db/dao/dashboardDAO"


export const getTotalEmployee = () =>{
    return getEmployeeCount();

}