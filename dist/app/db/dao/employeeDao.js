"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteExistEmployee = exports.updateExistEmp = exports.createNewEmployee = exports.getAllEmployee = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const __1 = require("..");
const schema_1 = require("../schema");
// get all employee
async function getAllEmployee() {
    try {
        return __1.db.query.employeesTable.findMany();
    }
    catch (error) {
        console.error('Error executing query', error);
    }
}
exports.getAllEmployee = getAllEmployee;
// create Employee
async function createNewEmployee(EmpData) {
    console.log(6);
    console.log(EmpData);
    const formattedData = {
        ...EmpData,
        enrolled_date: EmpData.enrolled_date.toString() // Convert to string
    };
    // Insert new employee into the database
    try {
        const newEmployee = await __1.db.insert(schema_1.employeesTable).values({ first_name: formattedData.first_name,
            last_name: formattedData.last_name, email: formattedData.email,
            enrolled_date: formattedData.enrolled_date, role: formattedData.role,
            contact_number: formattedData.contact_number });
        return newEmployee;
    }
    catch (error) {
        console.error('Error executing query', error);
    }
    console.log(6);
}
exports.createNewEmployee = createNewEmployee;
async function updateExistEmp(EmpData) {
    console.log(EmpData);
    console.log(EmpData.emp_id);
    try {
        const updatedEmp = await __1.db.update(schema_1.employeesTable)
            .set({ first_name: EmpData.first_name, last_name: EmpData.last_name,
            email: EmpData.email, enrolled_date: EmpData.enrolled_date,
            role: EmpData.enrolled_date, contact_number: EmpData.contact_number
        })
            .where((0, drizzle_orm_1.eq)(schema_1.employeesTable.emp_id, EmpData.emp_id));
        console.log(4);
        return updatedEmp;
    }
    catch (error) {
        console.error('Error executing query', error);
    }
}
exports.updateExistEmp = updateExistEmp;
// returning({updatedEmpId : employee.Emp_Id})
// delete employee
async function deleteExistEmployee(id) {
    try {
        const delEmp = await __1.db.delete(schema_1.employeesTable).where((0, drizzle_orm_1.eq)(schema_1.employeesTable.emp_id, id.emp_id));
    }
    catch (error) {
        console.error('Error executing query', error);
    }
}
exports.deleteExistEmployee = deleteExistEmployee;
