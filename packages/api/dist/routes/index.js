"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const todo_routes_1 = __importDefault(require("./todo.routes"));
class Routes {
    constructor(app) {
        app.use("/api/todos", todo_routes_1.default);
    }
}
exports.default = Routes;
