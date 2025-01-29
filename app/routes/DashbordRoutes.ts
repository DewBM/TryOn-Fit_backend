import express from 'express';
import *as DashboardController from '../controllers/DashboardController';

export const DashboardRouter = express.Router();
DashboardRouter.get('/', DashboardController.doGet);