import { ErrorRequestHandler, RequestHandler } from "express";

export const NotFoundRoute: RequestHandler = (req, res) => {
  res.status(404);
  res.json({ error: "Endpoint não encontrado." });
};

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  res.status(400); // Bad Request
  console.log(err);
  res.json({ error: "Ocorreu algum erro." });
};
