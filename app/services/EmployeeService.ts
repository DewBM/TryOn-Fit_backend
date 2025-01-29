import { getAllEmployee } from "../db/dao/employeeDao"
import { createNewEmployee} from "../db/dao/employeeDao"
import { updateExistEmp} from "../db/dao/employeeDao"
import { deleteExistEmployee}from "../db/dao/employeeDao"

export const getEmployee = () => {
    return getAllEmployee();
}

export const createEmployee = (EmpData: {
    first_name: string;
    last_name: string;
    email: string;
    enrolled_date: string;
    role: string;
    contact_number: string;
}) => {
    console.log(5);
    return createNewEmployee(EmpData);
};

export const updateEmployee = (EmpData : {
    emp_id : number;
    first_name: string;
    last_name: string;
    email: string;
    enrolled_date: string;
    role: string;
    contact_number: string;

}) =>{
    console.log(2);
    return updateExistEmp(EmpData);
};

// export const deleteEmployee = (id : {emp_id : number}) => {
//     console.log("iddd" , id);
//     return deleteExistEmployee(id);
// }

export const deleteEmployee = (id: { empId: number }) => {
    return deleteExistEmployee(id);
}


