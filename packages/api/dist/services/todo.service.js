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
            console.log('[Service] Creating todo:', todoData);
            if (!todoData.text) {
                throw new Error("Content cannot be empty!");
            }
            const todo = {
                text: todoData.text,
                status: todoData.status || 'undone'
            };
            const savedTodo = yield todo_repository_1.default.save(todo);
            console.log('[Service] Todo created successfully:', savedTodo.toJSON());
            return savedTodo;
        });
    }
    getAllTodos(text) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('[Service] Getting all todos with text filter:', text);
            const todos = yield todo_repository_1.default.retrieveAll({ text });
            console.log('[Service] Found todos count:', todos.length);
            return todos;
        });
    }
    getTodoById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('[Service] Getting todo by id:', id);
            const todo = yield todo_repository_1.default.retrieveById(id);
            if (!todo) {
                throw new Error(`Cannot find Todo with id=${id}`);
            }
            console.log('[Service] Found todo:', todo.toJSON());
            return todo;
        });
    }
    updateTodo(id, todoData) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('[Service] Updating todo:', Object.assign({ id }, todoData));
            // First check if todo exists
            yield this.getTodoById(id);
            const todo = Object.assign({ id }, todoData);
            const updatedCount = yield todo_repository_1.default.update(todo);
            if (updatedCount !== 1) {
                throw new Error(`Cannot update Todo with id=${id}. Todo was not found or data is empty!`);
            }
            console.log('[Service] Todo updated successfully');
        });
    }
    deleteTodo(id) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('[Service] Deleting todo:', id);
            // First check if todo exists
            yield this.getTodoById(id);
            const deletedCount = yield todo_repository_1.default.delete(id);
            if (deletedCount !== 1) {
                throw new Error(`Cannot delete Todo with id=${id}. Todo was not found!`);
            }
            console.log('[Service] Todo deleted successfully');
        });
    }
    deleteAllTodos() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('[Service] Deleting all todos');
            const count = yield todo_repository_1.default.deleteAll();
            console.log('[Service] Deleted todos count:', count);
            return count;
        });
    }
    getCompletedTodos() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('[Service] Getting completed todos');
            const todos = yield todo_repository_1.default.retrieveAll({ status: 'done' });
            console.log('[Service] Found completed todos count:', todos.length);
            return todos;
        });
    }
}
exports.TodoService = TodoService;
