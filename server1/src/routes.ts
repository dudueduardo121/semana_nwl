import express from 'express';
import ClassesController from './controllers/ClassesController';
import ConnectionsController from './controllers/ConnectionsController';


const routes = express.Router();
const ClassesControllers = new ClassesController();
const connectionsController = new ConnectionsController();



// classes
routes.get('/classes', ClassesControllers.index);
routes.post('/classes', ClassesControllers.create);

//conexões
routes.get('/connections', connectionsController.index);
routes.post('/connections', connectionsController.create); 

export default routes;