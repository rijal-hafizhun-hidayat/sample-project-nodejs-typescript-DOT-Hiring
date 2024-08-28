import express from "express";
import { UsersController } from "../controller/users-controller";

const apiRoute = express.Router();

apiRoute.get("/api/users", UsersController.getAll);

export { apiRoute };
