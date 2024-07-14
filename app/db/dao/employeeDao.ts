import { eq } from "drizzle-orm";
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
    console.log(6);
    const formattedData = {
        ...EmpData,
        Enrolled_Date: EmpData.Enrolled_Date.toString() // Convert to string
      };
      console.log(7);

    // Insert new employee into the database
    const newEmployee = await db.insert(employee).values({ First_Name : formattedData.First_Name,
         Last_Name : formattedData.Last_Name, Email : formattedData.Email,
         Enrolled_Date : formattedData.Enrolled_Date, Role : formattedData.Role,
          Phone_Number : formattedData.Phone_Number});  
    return newEmployee;
    console.log(6);
}
interface empDataType {
    // Emp_Id : number;
    First_Name: string;
    Last_Name: string;
    Email: string; 
    Enrolled_Date: string; 
    Role: string; 
    Phone_Number: string;

}

export async function updateExistEmp(EmpData: empDataType , id : number) {
    console.log(EmpData);
    const updatedEmp  = await db.update(employee)
    .set({ First_Name: EmpData.First_Name,Last_Name : EmpData.Last_Name,
        Email : EmpData.Email, Enrolled_Date : EmpData.Enrolled_Date, 
        Role : EmpData.Role , Phone_Number : EmpData.Phone_Number
        
     })
    .where(eq(employee.Emp_Id,id));
        console.log(4);
        return updatedEmp;
}

// returning({updatedEmpId : employee.Emp_Id})