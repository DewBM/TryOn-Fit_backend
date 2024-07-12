import { getAllEmployee } from "../db/dao/employeeDao"

export const getEmployee = () => {
    return getAllEmployee();
}