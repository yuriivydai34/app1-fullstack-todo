"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodoController = void 0;
const todo_service_1 = require("../services/todo.service");
class TodoController {
    constructor() {
        this.create = (req, res) => __awaiter(this, void 0, void 0, function* () {
            console.log('[Controller] Create todo request:', req.body);
            try {
                const savedTodo = yield this.todoService.createTodo(req.body);
                res.status(201).send(savedTodo);
            }
            catch (err) {
                console.error('[Controller] Error creating todo:', err);
                res.status(err.message.includes("empty") ? 400 : 500).send({
                    message: err.message || "Some error occurred while creating the Todo."
                });
            }
        });
        this.findAll = (req, res) => __awaiter(this, void 0, void 0, function* () {
            console.log('[Controller] Find all todos request, query:', req.query);
            try {
                const text = req.query.text;
                const todos = yield this.todoService.getAllTodos(text);
                res.send(todos);
            }
            catch (err) {
                console.error('[Controller] Error retrieving todos:', err);
                res.status(500).send({
                    message: err.message || "Some error occurred while retrieving todos."
                });
            }
        });
        this.findOne = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const id = parseInt(req.params.id);
            console.log('[Controller] Find one todo request, id:', id);
            try {
                const todo = yield this.todoService.getTodoById(id);
                res.send(todo);
            }
            catch (err) {
                console.error('[Controller] Error retrieving todo:', err);
                res.status(err.message.includes("Cannot find") ? 404 : 500).send({
                    message: err.message || `Error retrieving Todo with id=${id}`
                });
            }
        });
        this.update = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const id = parseInt(req.params.id);
            console.log('[Controller] Update todo request, id:', id, 'data:', req.body);
            try {
                yield this.todoService.updateTodo(id, req.body);
                res.send({
                    message: "Todo was updated successfully."
                });
            }
            catch (err) {
                console.error('[Controller] Error updating todo:', err);
                res.status(err.message.includes("Cannot find") ? 404 : 500).send({
                    message: err.message || `Error updating Todo with id=${id}`
                });
            }
        });
        this.delete = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const id = parseInt(req.params.id);
            console.log('[Controller] Delete todo request, id:', id);
            try {
                yield this.todoService.deleteTodo(id);
                res.send({
                    message: "Todo was deleted successfully!"
                });
            }
            catch (err) {
                console.error('[Controller] Error deleting todo:', err);
                res.status(err.message.includes("Cannot find") ? 404 : 500).send({
                    message: err.message || `Could not delete Todo with id=${id}`
                });
            }
        });
        this.deleteAll = (req, res) => __awaiter(this, void 0, void 0, function* () {
            console.log('[Controller] Delete all todos request');
            try {
                const count = yield this.todoService.deleteAllTodos();
                res.send({
                    message: `${count} Todos were deleted successfully!`
                });
            }
            catch (err) {
                console.error('[Controller] Error deleting all todos:', err);
                res.status(500).send({
                    message: err.message || "Some error occurred while removing all todos."
                });
            }
        });
        this.findAllCompleted = (req, res) => __awaiter(this, void 0, void 0, function* () {
            console.log('[Controller] Find all completed todos request');
            try {
                const todos = yield this.todoService.getCompletedTodos();
                res.send(todos);
            }
            catch (err) {
                console.error('[Controller] Error retrieving completed todos:', err);
                res.status(500).send({
                    message: err.message || "Some error occurred while retrieving completed todos."
                });
            }
        });
        this.todoService = new todo_service_1.TodoService();
    }
}
exports.TodoController = TodoController;
