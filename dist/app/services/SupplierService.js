"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteSupplier = exports.updateSupplier = exports.getSupplier = exports.createSupplier = void 0;
const SupplierDao_1 = require("../db/dao/SupplierDao");
const createSupplier = (supData) => {
    return (0, SupplierDao_1.createNewSupplier)(supData);
};
exports.createSupplier = createSupplier;
const getSupplier = () => {
    return (0, SupplierDao_1.getAllSupplier)();
};
exports.getSupplier = getSupplier;
const updateSupplier = (supData, id) => {
    return (0, SupplierDao_1.updateSupplierData)(supData, id);
};
exports.updateSupplier = updateSupplier;
const deleteSupplier = (id) => {
    return (0, SupplierDao_1.deleteExistSuplier)(id);
};
exports.deleteSupplier = deleteSupplier;
