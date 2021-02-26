import { Request, Response } from "express";
import { getCustomRepository, Not, IsNull } from "typeorm";
import { SurveysUsersRepository } from "../repositories/SurveysUsersRepository";
import * as yup from "yup";

class NpsController {
  async execute(request: Request, response: Response) {
    const { survey_id } = request.params;

    const surveysUsersRepository = getCustomRepository(SurveysUsersRepository);

    const surveysUsersList = await surveysUsersRepository.find({
      survey_id,
      value: Not(IsNull()),
    });

    const detractor = surveysUsersList.filter(
      (survey_user) => survey_user.value >= 0 && survey_user.value <= 6
    ).length;

    const promoters = surveysUsersList.filter(
      (survey_user) => survey_user.value >= 9 && survey_user.value <= 10
    ).length;

    const passive = surveysUsersList.filter(
      (survey_user) => survey_user.value >= 7 && survey_user.value <= 8
    ).length;

    const totalAnswers = surveysUsersList.length;

    const nps = Number(
      (((promoters - detractor) / totalAnswers) * 100).toFixed(2)
    );

    return response.json({
      detractor,
      promoters,
      passive,
      totalAnswers,
      nps,
    });
  }
}

export default new NpsController();
