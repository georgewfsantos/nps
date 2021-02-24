import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { User } from "../models/User";

class UserController {
  async create(request: Request, response: Response) {
    const { name, email } = request.body;

    const usersRepository = getRepository(User);

    const emailIsTaken = await usersRepository.findOne({
      email,
    });

    if (emailIsTaken) {
      return response
        .status(400)
        .json({ error: "This email address is already taken" });
    }

    const user = usersRepository.create({
      name,
      email,
    });

    await usersRepository.save(user);

    return response.json(user);
  }
}

export default new UserController();
