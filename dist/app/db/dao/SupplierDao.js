"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteExistSuplier = exports.updateSupplierData = exports.createNewSupplier = exports.getAllSupplier = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const __1 = require("..");
const Supplier_1 = require("../schema/Supplier");
async function getAllSupplier() {
    try {
        return __1.db.query.suppliersTable.findMany();
    }
    catch (error) {
        console.error('Error executing query', error);
    }
}
exports.getAllSupplier = getAllSupplier;
async function createNewSupplier(supData) {
    console.log(supData);
    try {
        const newSupplier = await __1.db.insert(Supplier_1.suppliersTable).values({
            supplier_id: supData.supplier_id,
            first_name: supData.first_name,
            last_name: supData.last_name,
            brand_name: supData.brand_name,
            contact_no: supData.contact_no,
            address: supData.address
        });
    }
    catch (error) {
        console.error('Error executing query', error);
    }
}
exports.createNewSupplier = createNewSupplier;
async function updateSupplierData(supData, id) {
    console.log(supData);
    try {
        const updatedEmp = await __1.db.update(Supplier_1.suppliersTable)
            .set({
            first_name: supData.first_name,
            last_name: supData.last_name,
            brand_name: supData.brand_name,
            contact_no: supData.contact_no,
            address: supData.address
        })
            .where((0, drizzle_orm_1.eq)(Supplier_1.suppliersTable.supplier_id, id));
        console.log(id);
        return updatedEmp;
    }
    catch (error) {
        console.error('Error executing query', error);
    }
}
exports.updateSupplierData = updateSupplierData;
async function deleteExistSuplier(id) {
    try {
        const delsup = await __1.db.delete(Supplier_1.suppliersTable).where((0, drizzle_orm_1.eq)(Supplier_1.suppliersTable.supplier_id, id));
    }
    catch (error) {
        console.error('Error executing query', error);
    }
}
exports.deleteExistSuplier = deleteExistSuplier;
