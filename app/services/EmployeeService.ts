import { getAllEmployee } from "../db/dao/employeeDao"
import { createNewEmployee} from "../db/dao/employeeDao"
import { updateExistEmp} from "../db/dao/employeeDao"

export const getEmployee = () => {
    return getAllEmployee();
}

export const createEmployee = (EmpData: {
    First_Name: string;
    Last_Name: string;
    Email: string;
    Enrolled_Date: string;
    Role: string;
    Phone_Number: string;
}) => {
    console.log(5);
    return createNewEmployee(EmpData);
};

export const updateEmployee = (EmpData : {
    // Emp_Id : number;
    First_Name: string;
    Last_Name: string;
    Email: string;
    Enrolled_Date: string;
    Role: string;
    Phone_Number: string;

},id : number) =>{
    console.log(2);
    return updateExistEmp(EmpData,id);
};


