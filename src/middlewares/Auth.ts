import { RequestHandler } from "express";

type AuthType = {
  private: RequestHandler;
};

export const Auth: AuthType = {
  private: (req, res, next) => {
    let success = false;
    // fazer verificação de auth

    if (success) {
      next();
    } else {
      res.status(403).json({ error: "Not Authorized" });
    }
  },
};
