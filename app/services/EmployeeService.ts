import { getAllEmployee } from "../db/dao/employeeDao"
import { createNewEmployee} from "../db/dao/employeeDao"

export const getEmployee = () => {
    return getAllEmployee();
}

export const createEmployee = (EmpData: {
    Manager_Id: number;
    First_Name: string;
    Last_Name: string;
    Email: string;
    Enrolled_Date: string;
    Role: string;
    Phone_Number: string;
}) => {
    console.log(EmpData);
    return createNewEmployee(EmpData);
};