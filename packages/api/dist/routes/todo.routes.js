"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const todo_controller_1 = __importDefault(require("../controllers/todo.controller"));
class TodoRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.controller = new todo_controller_1.default();
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
exports.default = new TodoRoutes().router;
