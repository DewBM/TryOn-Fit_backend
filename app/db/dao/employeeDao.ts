import { eq } from "drizzle-orm";
import { db } from "..";
import { employee } from "../schema";

// get all employee
export async function getAllEmployee() {
try{
    return db.query.employee.findMany();
}catch(error){  
    console.error('Error executing query', error);
}
} 





// create Employee
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
    try{
    const newEmployee = await db.insert(employee).values({ First_Name : formattedData.First_Name,
         Last_Name : formattedData.Last_Name, Email : formattedData.Email,
         Enrolled_Date : formattedData.Enrolled_Date, Role : formattedData.Role,
          Phone_Number : formattedData.Phone_Number});  
    return newEmployee;
    }catch(error){  
        console.error('Error executing query', error);
    }
    console.log(6);
}




// update employee
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
    try{
    const updatedEmp  = await db.update(employee)
    .set({ First_Name: EmpData.First_Name,Last_Name : EmpData.Last_Name,
        Email : EmpData.Email, Enrolled_Date : EmpData.Enrolled_Date, 
        Role : EmpData.Role , Phone_Number : EmpData.Phone_Number
        
     })
    .where(eq(employee.Emp_Id,id));
        console.log(4);
        return updatedEmp;
    }catch(error){
        console.error('Error executing query', error);
    }
}

// returning({updatedEmpId : employee.Emp_Id})



// delete employee
export async function deleteExistEmployee(id:number) {
    try{
        const delEmp = await db.delete(employee).where(eq(employee.Emp_Id, id));
    }catch(error){
        console.error('Error executing query', error);
    }

}