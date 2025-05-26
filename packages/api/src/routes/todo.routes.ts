import { Router } from "express";
import { TodoController } from "../controllers/todo.controller";

const router = Router();
const todoController = new TodoController();

router.post("/", todoController.create);
router.get("/", todoController.findAll);
router.get("/completed", todoController.findAllCompleted);
router.get("/:id", todoController.findOne);
router.put("/:id", todoController.update);
router.delete("/:id", todoController.delete);
router.delete("/", todoController.deleteAll);

export default router;
