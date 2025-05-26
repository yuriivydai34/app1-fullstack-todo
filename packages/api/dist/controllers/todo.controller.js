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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodoController = void 0;
const todo_repository_1 = __importDefault(require("../repositories/todo.repository"));
class TodoController {
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('[Controller] Create todo request:', req.body);
            try {
                if (!req.body.text) {
                    console.log('[Controller] Create todo validation failed: missing text');
                    res.status(400).send({
                        message: "Content can not be empty!"
                    });
                    return;
                }
                const todo = {
                    text: req.body.text,
                    status: req.body.status || "undone"
                };
                const savedTodo = yield todo_repository_1.default.save(todo);
                console.log('[Controller] Todo created successfully:', savedTodo.toJSON());
                res.status(201).send(savedTodo);
            }
            catch (err) {
                console.error('[Controller] Error creating todo:', err);
                res.status(500).send({
                    message: "Some error occurred while creating the Todo."
                });
            }
        });
    }
    findAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('[Controller] Find all todos request, query:', req.query);
            try {
                const text = req.query.text;
                const todos = yield todo_repository_1.default.retrieveAll({ text });
                console.log('[Controller] Found todos count:', todos.length);
                res.send(todos);
            }
            catch (err) {
                console.error('[Controller] Error retrieving todos:', err);
                res.status(500).send({
                    message: "Some error occurred while retrieving todos."
                });
            }
        });
    }
    findOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = parseInt(req.params.id);
            console.log('[Controller] Find one todo request, id:', id);
            try {
                const todo = yield todo_repository_1.default.retrieveById(id);
                if (todo) {
                    console.log('[Controller] Found todo:', todo.toJSON());
                    res.send(todo);
                }
                else {
                    console.log('[Controller] Todo not found with id:', id);
                    res.status(404).send({
                        message: `Cannot find Todo with id=${id}.`
                    });
                }
            }
            catch (err) {
                console.error('[Controller] Error retrieving todo:', err);
                res.status(500).send({
                    message: `Error retrieving Todo with id=${id}`
                });
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = parseInt(req.params.id);
            console.log('[Controller] Update todo request, id:', id, 'data:', req.body);
            try {
                const todo = Object.assign({ id }, req.body);
                const num = yield todo_repository_1.default.update(todo);
                if (num === 1) {
                    console.log('[Controller] Todo updated successfully, id:', id);
                    res.send({
                        message: "Todo was updated successfully."
                    });
                }
                else {
                    console.log('[Controller] Todo not found for update, id:', id);
                    res.status(404).send({
                        message: `Cannot update Todo with id=${id}. Maybe Todo was not found!`
                    });
                }
            }
            catch (err) {
                console.error('[Controller] Error updating todo:', err);
                res.status(500).send({
                    message: `Error updating Todo with id=${id}`
                });
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = parseInt(req.params.id);
            console.log('[Controller] Delete todo request, id:', id);
            try {
                const num = yield todo_repository_1.default.delete(id);
                if (num === 1) {
                    console.log('[Controller] Todo deleted successfully, id:', id);
                    res.send({
                        message: "Todo was deleted successfully!"
                    });
                }
                else {
                    console.log('[Controller] Todo not found for deletion, id:', id);
                    res.status(404).send({
                        message: `Cannot delete Todo with id=${id}. Maybe Todo was not found!`
                    });
                }
            }
            catch (err) {
                console.error('[Controller] Error deleting todo:', err);
                res.status(500).send({
                    message: `Could not delete Todo with id=${id}`
                });
            }
        });
    }
    deleteAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('[Controller] Delete all todos request');
            try {
                const nums = yield todo_repository_1.default.deleteAll();
                console.log('[Controller] Deleted todos count:', nums);
                res.send({
                    message: `${nums} Todos were deleted successfully!`
                });
            }
            catch (err) {
                console.error('[Controller] Error deleting all todos:', err);
                res.status(500).send({
                    message: "Some error occurred while removing all todos."
                });
            }
        });
    }
    findAllCompleted(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('[Controller] Find all completed todos request');
            try {
                const todos = yield todo_repository_1.default.retrieveAll({ status: 'done' });
                console.log('[Controller] Found completed todos count:', todos.length);
                res.send(todos);
            }
            catch (err) {
                console.error('[Controller] Error retrieving completed todos:', err);
                res.status(500).send({
                    message: "Some error occurred while retrieving completed todos."
                });
            }
        });
    }
}
exports.TodoController = TodoController;
