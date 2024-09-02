"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.doDel = exports.doPut = exports.doPost = exports.doGet = void 0;
const EmployeeService_1 = require("../services/EmployeeService");
async function doGet(req, resp) {
    const data = await (0, EmployeeService_1.getEmployee)();
    console.log(data);
    resp.status(200).send(data);
}
exports.doGet = doGet;
async function doPost(req, resp) {
    try {
        const data = await (0, EmployeeService_1.createEmployee)(req.body);
        resp.status(201).send(data);
    }
    catch (error) {
        resp.status(500).send({ error: 'Failed to create employee' });
    }
}
exports.doPost = doPost;
async function doPut(req, resp) {
    const id = 16;
    console.log(id);
    try {
        const data = await (0, EmployeeService_1.updateEmployee)(req.body);
        resp.status(201).send(data);
    }
    catch (error) {
        resp.status(500).send({ error: 'Failed to update employee' });
    }
}
exports.doPut = doPut;
async function doDel(req, resp) {
    const id = 27;
    console.log(id);
    try {
        const data = await (0, EmployeeService_1.deleteEmployee)(req.body);
        resp.status(201).send(data);
    }
    catch (error) {
        resp.status(500).send({ error: 'Failed to update employee' });
    }
}
exports.doDel = doDel;
