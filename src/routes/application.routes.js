import express from 'express';
import { allApplication, createApplication, deleteApplication, updateApplication } from '../controllers/application.controller.js';
import protect from '../middlewares/protect.js';

const applicationRouter = express.Router();
applicationRouter.use(protect);
applicationRouter.get('/', allApplication);
applicationRouter.put('/:id', updateApplication);
applicationRouter.post('/', createApplication);
applicationRouter.delete('/:id', deleteApplication);

export default applicationRouter;