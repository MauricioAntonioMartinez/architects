import { Request, Response } from "express";
import { Connection } from "typeorm";
import { createUserLoader } from "./loaders/User";
import { createWeekDateLoader } from "./loaders/weekDate";

export type MyContext = {
  req: Request;
  res: Response;
  userLoader: ReturnType<typeof createUserLoader>;
  dateLoader: ReturnType<typeof createWeekDateLoader>;
  db: Connection;
};
