"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const todo_controller_1 = require("../controllers/todo.controller");
const router = (0, express_1.Router)();
const todoController = new todo_controller_1.TodoController();
// Bind methods to maintain 'this' context
router.post("/", todoController.create);
router.get("/", todoController.findAll);
router.get("/completed", todoController.findAllCompleted);
router.get("/:id", todoController.findOne);
router.put("/:id", todoController.update);
router.delete("/:id", todoController.delete);
router.delete("/", todoController.deleteAll);
exports.default = router;
