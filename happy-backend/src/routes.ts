import {Request,Response, Router} from  'express';
import {getRepository} from 'typeorm';

import multer from 'multer';
import uploadConfig from './config/upload';
const storage = multer(uploadConfig);

import OrphanagesController from './controllers/OrphanagesController';

const routes = Router();

routes.get('/orphanages', OrphanagesController.index);
routes.get('/orphanages/:id', OrphanagesController.show);
routes.post('/orphanages', storage.array('images'),OrphanagesController.create);

export default routes;