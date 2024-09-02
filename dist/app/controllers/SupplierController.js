"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.doDelete = exports.doPut = exports.doPost = exports.doGet = void 0;
const SupplierService_1 = require("../services/SupplierService");
async function doGet(req, resp) {
    try {
        const data = await (0, SupplierService_1.getSupplier)();
        resp.status(201).send(data);
    }
    catch (error) {
        resp.status(500).send({ error: 'Failed to create Supplier' });
    }
}
exports.doGet = doGet;
async function doPost(req, resp) {
    try {
        const data = await (0, SupplierService_1.createSupplier)(req.body);
        resp.status(201).send(data);
    }
    catch (error) {
        resp.status(500).send({ error: 'Failed to create Supplier' });
    }
}
exports.doPost = doPost;
async function doPut(req, resp) {
    const supid = "";
    try {
        const data = await (0, SupplierService_1.updateSupplier)(req.body, supid);
        resp.status(201).send(data);
    }
    catch (error) {
        resp.status(500).send({ error: 'Failed to create Supplier' });
    }
}
exports.doPut = doPut;
async function doDelete(req, resp) {
    const id = "";
    try {
        const data = await (0, SupplierService_1.deleteSupplier)(id);
        resp.status(201).send(data);
    }
    catch (error) {
        resp.status(500).send({ error: 'Failed to create Supplier' });
    }
}
exports.doDelete = doDelete;
