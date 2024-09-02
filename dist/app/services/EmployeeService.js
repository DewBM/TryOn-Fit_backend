"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteEmployee = exports.updateEmployee = exports.createEmployee = exports.getEmployee = void 0;
const employeeDao_1 = require("../db/dao/employeeDao");
const employeeDao_2 = require("../db/dao/employeeDao");
const employeeDao_3 = require("../db/dao/employeeDao");
const employeeDao_4 = require("../db/dao/employeeDao");
const getEmployee = () => {
    return (0, employeeDao_1.getAllEmployee)();
};
exports.getEmployee = getEmployee;
const createEmployee = (EmpData) => {
    console.log(5);
    return (0, employeeDao_2.createNewEmployee)(EmpData);
};
exports.createEmployee = createEmployee;
const updateEmployee = (EmpData) => {
    console.log(2);
    return (0, employeeDao_3.updateExistEmp)(EmpData);
};
exports.updateEmployee = updateEmployee;
const deleteEmployee = (id) => {
    return (0, employeeDao_4.deleteExistEmployee)(id);
};
exports.deleteEmployee = deleteEmployee;
