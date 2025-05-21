import { Router } from "express";
import TodoController from "../controllers/todo.controller";

class TodoRoutes {
  router = Router();
  controller = new TodoController();

  constructor() {
    this.intializeRoutes();
  }

  intializeRoutes() {
    // Create a new Todo
    this.router.post("/", this.controller.create);

    // Retrieve all Todos
    this.router.get("/", this.controller.findAll);

    // Retrieve all published Todos
    this.router.get("/published", this.controller.findAllCompleted);

    // Retrieve a single Todo with id
    this.router.get("/:id", this.controller.findOne);

    // Update a Todo with id
    this.router.put("/:id", this.controller.update);

    // Delete a Todo with id
    this.router.delete("/:id", this.controller.delete);

    // Delete all Todos
    this.router.delete("/", this.controller.deleteAll);
  }
}

export default new TodoRoutes().router;
