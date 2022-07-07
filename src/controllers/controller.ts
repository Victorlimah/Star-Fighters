import { Request, Response } from "express";
import * as service from "../services/service.js";

export async function battle(req: Request, res: Response) {
  const { firstUser, secondUser } = req.body;

  const startsFirstUser = await service.getStars(firstUser);
  const startsSecondUser = await service.getStars(secondUser);

  const results = service.battle(
    { stars: startsFirstUser, name: firstUser },
    { stars: startsSecondUser, name: secondUser }
  );

  res.send(results);
}

export async function ranking(req: Request, res: Response) {
  const { rows: fighters } = await service.getRanking();

  res.send({fighters});
}