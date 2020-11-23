import { RequestHandler } from "express";
import jwt from "jsonwebtoken";

export const isAuth: RequestHandler = async (req, res, next) => {
  const auth = req.get("Authorization");

  if (!auth) {
    req.isAuth = false;
    return next();
  }

  const token = auth?.split(" ")[1];

  if (!token || token == "") {
    req.isAuth = false;
    return next();
  }
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, process.env.SECRET) as {
      email: string;
      role: string;
    };
  } catch (e) {
    req.isAuth = false;
    return next();
  }

  if (!decodedToken) {
    req.isAuth = false;
    return next();
  }

  req.isAuth = true;
  req.user = {
    email: decodedToken.email,
    role: decodedToken.role,
  };
};
