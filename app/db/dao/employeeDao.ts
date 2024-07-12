import { db } from "..";

export async function getAllEmployee() {
    return db.query.employee.findMany();
}