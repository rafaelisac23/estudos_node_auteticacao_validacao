import { Request, Response } from "express";
import { User } from "../models/User";

export const ping = (req: Request, res: Response) => {
  res.json({ pong: true });
};

export const register = async (req: Request, res: Response) => {
  console.log(req.body);
  console.log(req.params);

  if (req.body.email && req.body.password) {
    let { email, password } = req.body;

    let hasUser = await User.findOne({ where: { email } });
    if (!hasUser) {
      let newUser = await User.create({ email, password });

      res.status(201);
      res.json({ id: newUser.id });
    } else {
      res.status(401).json({ error: "E-mail já existe." });
    }
  }

  res.status(400).json({ error: "E-mail e/ou senha não enviados." });
};

export const login = async (req: Request, res: Response) => {
  if (req.body.email && req.body.password) {
    let email: string = req.body.email;
    let password: string = req.body.password;

    let user = await User.findOne({
      where: { email, password },
    });

    if (user) {
      res.status(200).json({ status: true });
      return;
    }
  }

  res.status(400).json({ status: false });
};

export const list = async (req: Request, res: Response) => {
  let users = await User.findAll();
  let list: string[] = [];

  for (let i in users) {
    list.push(users[i].email);
  }

  res.json({ list });
};
