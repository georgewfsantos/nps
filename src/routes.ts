import { Router } from "express";
import AnswerController from "./controllers/AnswerController";
import NpsControllter from "./controllers/NpsControllter";
import SendMailController from "./controllers/SendMailController";
import SurveysController from "./controllers/SurveysController";
import UsersController from "./controllers/UsersController";

const routes = Router();

routes.post("/users", UsersController.create);

routes.post("/surveys", SurveysController.create);
routes.get("/surveys", SurveysController.show);

routes.post("/sendMail", SendMailController.execute);

routes.get("/answers/:value", AnswerController.execute);

routes.get("/nps/:survey_id", NpsControllter.execute);

export default routes;
