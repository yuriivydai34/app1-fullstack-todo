import { Application } from "express";
import todoRoutes from "./todo.routes";

export default class Routes {
  constructor(app: Application) {
    app.use("/api/todos", todoRoutes);
  }
}
