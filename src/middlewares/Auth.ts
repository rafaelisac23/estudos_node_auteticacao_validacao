import { RequestHandler } from "express";
import { User } from "../models/User";
import JWT from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

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

  JWTAuth: async (req, res, next) => {
    let success = false;

    // fazer verificação de JWTAuth
    if (req.headers.authorization) {
      //Padrao no header e no que vem na req -> Bearer Token
      // aqui ele ja ta pegando e separando o authorization do header
      const [authType, token] = req.headers.authorization.split(" ");
      //Verifica se a autoização é um Bearer
      if (authType === "Bearer") {
        try {
          //Validar o token
          const decoded = JWT.verify(
            token,
            process.env.JWT_SECRET_KEY as string
          );
          success = true;
        } catch (err) {}
      }
    }

    if (success) {
      next();
    } else {
      res.status(403).json({ error: "Not Authorized" });
    }
  },
};
