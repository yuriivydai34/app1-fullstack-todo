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
const sequelize_1 = require("sequelize");
const todo_model_1 = __importDefault(require("../models/todo.model"));
class TodoRepository {
    save(todo) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield todo_model_1.default.create({
                    text: todo.text,
                    status: todo.status
                });
            }
            catch (err) {
                throw new Error("Failed to create Todo!");
            }
        });
    }
    retrieveAll(searchParams) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let condition = {};
                if (searchParams === null || searchParams === void 0 ? void 0 : searchParams.status)
                    condition.status = true;
                if (searchParams === null || searchParams === void 0 ? void 0 : searchParams.text)
                    condition.text = { [sequelize_1.Op.iLike]: `%${searchParams.text}%` };
                return yield todo_model_1.default.findAll({ where: condition });
            }
            catch (error) {
                throw new Error("Failed to retrieve Todos!");
            }
        });
    }
    retrieveById(todoId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield todo_model_1.default.findByPk(todoId);
            }
            catch (error) {
                throw new Error("Failed to retrieve Todos!");
            }
        });
    }
    update(todo) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id, text, status } = todo;
            try {
                const affectedRows = yield todo_model_1.default.update({ text, status }, { where: { id: id } });
                return affectedRows[0];
            }
            catch (error) {
                throw new Error("Failed to update Todo!");
            }
        });
    }
    delete(todoId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const affectedRows = yield todo_model_1.default.destroy({ where: { id: todoId } });
                return affectedRows;
            }
            catch (error) {
                throw new Error("Failed to delete Todo!");
            }
        });
    }
    deleteAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return todo_model_1.default.destroy({
                    where: {},
                    truncate: false
                });
            }
            catch (error) {
                throw new Error("Failed to delete Todos!");
            }
        });
    }
}
exports.default = new TodoRepository();
