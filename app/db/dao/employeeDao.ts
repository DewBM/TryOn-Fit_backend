import { eq } from "drizzle-orm";
import { db } from "..";
import { employeesTable } from "../schema";

// get all employee
export async function getAllEmployee() {
try{
    return db.query.employeesTable.findMany();
}catch(error){  
    console.error('Error executing query', error);
}
} 





// create Employee
export async function createNewEmployee(EmpData: {
    // Emp_Id: number;
    first_name: string;
    last_name: string;
    email: string;
    enrolled_date: string;
    role: string;
    contact_number: string;
} ) {
    console.log(6);
    console.log(EmpData);
    const formattedData = {
        ...EmpData,
        enrolled_date: EmpData.enrolled_date.toString() // Convert to string
      };
      

    // Insert new employee into the database
    try{
    const newEmployee = await db.insert(employeesTable).values({ first_name : formattedData.first_name,
         last_name : formattedData.last_name, email : formattedData.email,
         enrolled_date : formattedData.enrolled_date, role : formattedData.role,
          contact_number : formattedData.contact_number});  
    return newEmployee;
    }catch(error){  
        console.error('Error executing query', error);
    }
    console.log(6);
}




// update employee
interface empDataType {
    emp_id : number;
    first_name: string;
    last_name: string;
    email: string; 
    enrolled_date: string; 
    role: string; 
    contact_number: string;

}

export async function updateExistEmp(EmpData: empDataType ) {
    console.log(EmpData);
   
    console.log(EmpData.emp_id);
    try{
    const updatedEmp  = await db.update(employeesTable)
    .set({ first_name: EmpData.first_name,last_name : EmpData.last_name,
        email : EmpData.email, enrolled_date : EmpData.enrolled_date, 
        role : EmpData.enrolled_date , contact_number : EmpData.contact_number
        
     })
    .where(eq(employeesTable.emp_id,EmpData.emp_id));
        console.log(4);
        return updatedEmp;
    }catch(error){
        console.error('Error executing query', error);
    }
}

// returning({updatedEmpId : employee.Emp_Id})



// delete employee
export async function deleteExistEmployee(id:{emp_id : number}) {
    try{
        const delEmp = await db.delete(employeesTable).where(eq(employeesTable.emp_id, id.emp_id));
    }catch(error){
        console.error('Error executing query', error);
    }

}