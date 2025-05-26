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
const todo_repository_1 = __importDefault(require("../repositories/todo.repository"));
class TodoController {
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!req.body.text) {
                res.status(400).send({
                    message: "Content can not be empty!"
                });
                return;
            }
            try {
                const todo = req.body;
                if (!todo.status)
                    todo.status = 'undone';
                const savedTodo = yield todo_repository_1.default.save(todo);
                res.status(201).send(savedTodo);
            }
            catch (err) {
                res.status(500).send({
                    message: "Some error occurred while retrieving todos."
                });
            }
        });
    }
    findAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const text = typeof req.query.text === "string" ? req.query.text : "";
            try {
                const todos = yield todo_repository_1.default.retrieveAll({ text });
                res.status(200).send(todos);
            }
            catch (err) {
                res.status(500).send({
                    message: "Some error occurred while retrieving todos."
                });
            }
        });
    }
    findOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = parseInt(req.params.id);
            try {
                const todo = yield todo_repository_1.default.retrieveById(id);
                if (todo)
                    res.status(200).send(todo);
                else
                    res.status(404).send({
                        message: `Cannot find Todo with id=${id}.`
                    });
            }
            catch (err) {
                res.status(500).send({
                    message: `Error retrieving Todo with id=${id}.`
                });
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let todo = req.body;
            todo.id = parseInt(req.params.id);
            try {
                const num = yield todo_repository_1.default.update(todo);
                if (num == 1) {
                    res.send({
                        message: "Todo was updated successfully."
                    });
                }
                else {
                    res.send({
                        message: `Cannot update Todo with id=${todo.id}. Maybe Todo was not found or req.body is empty!`
                    });
                }
            }
            catch (err) {
                res.status(500).send({
                    message: `Error updating Todo with id=${todo.id}.`
                });
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = parseInt(req.params.id);
            try {
                const num = yield todo_repository_1.default.delete(id);
                if (num == 1) {
                    res.send({
                        message: "Todo was deleted successfully!"
                    });
                }
                else {
                    res.send({
                        message: `Cannot delete Todo with id=${id}. Maybe Todo was not found!`,
                    });
                }
            }
            catch (err) {
                res.status(500).send({
                    message: `Could not delete Todo with id==${id}.`
                });
            }
        });
    }
    deleteAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const num = yield todo_repository_1.default.deleteAll();
                res.send({ message: `${num} Todos were deleted successfully!` });
            }
            catch (err) {
                res.status(500).send({
                    message: "Some error occurred while removing all todos."
                });
            }
        });
    }
    findAllCompleted(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const todos = yield todo_repository_1.default.retrieveAll({ status: true });
                res.status(200).send(todos);
            }
            catch (err) {
                res.status(500).send({
                    message: "Some error occurred while retrieving todos."
                });
            }
        });
    }
}
exports.default = TodoController;
