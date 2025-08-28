import express, { Request, Response, ErrorRequestHandler } from "express";
import path from "path";
import dotenv from "dotenv";
import cors from "cors";
import apiRoutes from "./routes/api";
import { errorHandler, NotFoundRoute } from "./errorHandler/errorHandler";

dotenv.config();

const server = express();

server.use(cors());

server.use(express.static(path.join(__dirname, "../public")));
server.use(express.urlencoded({ extended: true }));

server.get("/ping", (req: Request, res: Response) => res.json({ pong: true }));

server.use(apiRoutes);

server.use(NotFoundRoute);

server.use(errorHandler);

server.listen(process.env.PORT);
