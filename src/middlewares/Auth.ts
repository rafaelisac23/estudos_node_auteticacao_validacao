import { RequestHandler } from "express";
import { User } from "../models/User";

type AuthType = {
  basicAuth: RequestHandler;
  JWTAuth: RequestHandler;
};

export const Auth: AuthType = {
  basicAuth: async (req, res, next) => {
    let success = false;

    // fazer verificação de auth
    if (req.headers.authorization) {
      let hash: string = req.headers.authorization.substring(6);

      //descriptografando o hash BASE64
      let decoded: string = Buffer.from(hash, "base64").toString();
      let data: string[] = decoded.split(":");

      //aqui se sua senha no banco de dados esta criptografada, voce
      //ira descriptografar e mandar no lugar do password:data[1]
      // a senha descriptografada

      if (data.length === 2) {
        let hasUser = await User.findOne({
          where: {
            email: data[0],
            password: data[1],
          },
        });

        if (hasUser) {
          success = true;
        }
      }
    }

    if (success) {
      next();
    } else {
      res.status(403).json({ error: "Not Authorized" });
    }
  },

  JWTAuth: (req, res, next) => {},
};
