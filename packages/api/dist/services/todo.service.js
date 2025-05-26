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
exports.TodoService = void 0;
const todo_repository_1 = __importDefault(require("../repositories/todo.repository"));
class TodoService {
    createTodo(todoData) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!todoData.text) {
                throw new Error("Content cannot be empty!");
            }
            const newTodo = {
                text: todoData.text,
                status: todoData.status || 'undone'
            };
            return yield todo_repository_1.default.save(newTodo);
        });
    }
    getAllTodos(text) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield todo_repository_1.default.retrieveAll({ text });
        });
    }
    getTodoById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const todo = yield todo_repository_1.default.retrieveById(id);
            if (!todo) {
                throw new Error(`Cannot find Todo with id=${id}`);
            }
            return todo;
        });
    }
    updateTodo(id, todoData) {
        return __awaiter(this, void 0, void 0, function* () {
            const updateData = Object.assign({ id }, todoData);
            const updatedCount = yield todo_repository_1.default.update(updateData);
            if (updatedCount === 1) {
                return {
                    success: true,
                    message: "Todo was updated successfully."
                };
            }
            else {
                throw new Error(`Cannot update Todo with id=${id}. Todo was not found or data is empty!`);
            }
        });
    }
    deleteTodo(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const deletedCount = yield todo_repository_1.default.delete(id);
            if (deletedCount === 1) {
                return {
                    success: true,
                    message: "Todo was deleted successfully!"
                };
            }
            else {
                throw new Error(`Cannot delete Todo with id=${id}. Todo was not found!`);
            }
        });
    }
    deleteAllTodos() {
        return __awaiter(this, void 0, void 0, function* () {
            const count = yield todo_repository_1.default.deleteAll();
            return {
                count,
                message: `${count} Todos were deleted successfully!`
            };
        });
    }
    getCompletedTodos() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield todo_repository_1.default.retrieveAll({ status: true });
        });
    }
}
exports.TodoService = TodoService;
