import { db } from "..";
import { employee } from "../schema";

export async function getAllEmployee() {
    return db.query.employee.findMany();
} 
 
export async function createNewEmployee(EmpData: {
    // Emp_Id: number;
    First_Name: string;
    Last_Name: string;
    Email: string;
    Enrolled_Date: string;
    Role: string;
    Phone_Number: string;
} ) {
    const formattedData = {
        ...EmpData,
        Enrolled_Date: EmpData.Enrolled_Date.toString() // Convert to string
      };

    // Insert new employee into the database
    const newEmployee = await db.insert(employee).values({ First_Name : formattedData.First_Name,
         Last_Name : formattedData.Last_Name, Email : formattedData.Email,
         Enrolled_Date : formattedData.Enrolled_Date, Role : formattedData.Role,
          Phone_Number : formattedData.Phone_Number});  // Returning the inserted employee
    return newEmployee;
}