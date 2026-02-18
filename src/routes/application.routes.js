import express from 'express';
import { allApplication, createApplication, deleteApplication, getOneApplication, updateApplication } from '../controllers/application.controller.js';

const applicationRouter = express.Router();

applicationRouter.get('/', allApplication);
applicationRouter.get('/:id', getOneApplication);
applicationRouter.put('/:id', updateApplication);
applicationRouter.post('/', createApplication);
applicationRouter.delete('/:id', deleteApplication);

export default applicationRouter;