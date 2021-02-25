import { Router } from "express";
import SendMailController from "./controllers/SendMailController";
import SurveysController from "./controllers/SurveysController";
import UsersController from "./controllers/UsersController";

const routes = Router();

routes.post("/users", UsersController.create);

routes.post("/surveys", SurveysController.create);
routes.get("/surveys", SurveysController.show);

routes.post("/sendMail", SendMailController.execute);

export default routes;
