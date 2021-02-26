import { CannotExecuteNotConnectedError, getCustomRepository } from "typeorm";

import { Request, Response } from "express";
import { SurveysUsersRepository } from "../repositories/SurveysUsersRepository";
import { AppError } from "../errors/AppErrors";

class AnswerController {
  async execute(request: Request, response: Response) {
    const { u } = request.query;
    const { value } = request.params;

    const surveysUsersRepository = getCustomRepository(SurveysUsersRepository);

    const surveyUser = await surveysUsersRepository.findOne({
      id: String(u),
    });

    if (!surveyUser) {
      throw new AppError("No survey user was found");
    }

    surveyUser.value = Number(value);

    await surveysUsersRepository.save(surveyUser);

    return response.json(surveyUser);
  }
}

export default new AnswerController();
