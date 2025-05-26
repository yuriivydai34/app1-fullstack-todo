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
            console.log('[Repository] Attempting to save todo:', todo);
            try {
                const savedTodo = yield todo_model_1.default.create({
                    text: todo.text,
                    status: todo.status || 'undone'
                });
                console.log('[Repository] Successfully saved todo:', savedTodo.toJSON());
                return savedTodo;
            }
            catch (err) {
                console.error('[Repository] Error saving todo:', err);
                throw new Error("Failed to create Todo!");
            }
        });
    }
    retrieveAll(searchParams) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('[Repository] Retrieving all todos with params:', searchParams);
            try {
                let condition = {};
                if (searchParams === null || searchParams === void 0 ? void 0 : searchParams.status) {
                    condition.status = searchParams.status;
                }
                if (searchParams === null || searchParams === void 0 ? void 0 : searchParams.text) {
                    condition.text = { [sequelize_1.Op.like]: `%${searchParams.text}%` };
                }
                console.log('[Repository] Using search condition:', condition);
                const todos = yield todo_model_1.default.findAll({ where: condition });
                console.log('[Repository] Retrieved todos count:', todos.length);
                return todos;
            }
            catch (error) {
                console.error('[Repository] Error retrieving todos:', error);
                throw new Error("Failed to retrieve Todos!");
            }
        });
    }
    retrieveById(todoId) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('[Repository] Retrieving todo by id:', todoId);
            try {
                const todo = yield todo_model_1.default.findByPk(todoId);
                console.log('[Repository] Retrieved todo:', (todo === null || todo === void 0 ? void 0 : todo.toJSON()) || 'not found');
                return todo;
            }
            catch (error) {
                console.error('[Repository] Error retrieving todo by id:', error);
                throw new Error(`Failed to retrieve Todo with id=${todoId}!`);
            }
        });
    }
    update(todo) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('[Repository] Attempting to update todo:', todo);
            const { id, text, status } = todo;
            try {
                const updateData = {};
                if (text !== undefined)
                    updateData.text = text;
                if (status !== undefined)
                    updateData.status = status;
                console.log('[Repository] Update data:', updateData);
                const [affectedRows] = yield todo_model_1.default.update(updateData, { where: { id: id } });
                console.log('[Repository] Updated rows:', affectedRows);
                return affectedRows;
            }
            catch (error) {
                console.error('[Repository] Error updating todo:', error);
                throw new Error("Failed to update Todo!");
            }
        });
    }
    delete(todoId) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('[Repository] Attempting to delete todo:', todoId);
            try {
                const affectedRows = yield todo_model_1.default.destroy({ where: { id: todoId } });
                console.log('[Repository] Deleted rows:', affectedRows);
                return affectedRows;
            }
            catch (error) {
                console.error('[Repository] Error deleting todo:', error);
                throw new Error("Failed to delete Todo!");
            }
        });
    }
    deleteAll() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('[Repository] Attempting to delete all todos');
            try {
                const affectedRows = yield todo_model_1.default.destroy({
                    where: {},
                    truncate: false
                });
                console.log('[Repository] Deleted all rows:', affectedRows);
                return affectedRows;
            }
            catch (error) {
                console.error('[Repository] Error deleting all todos:', error);
                throw new Error("Failed to delete Todos!");
            }
        });
    }
}
exports.default = new TodoRepository();
