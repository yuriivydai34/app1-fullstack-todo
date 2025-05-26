"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const index_1 = __importDefault(require("./index"));
const app = (0, express_1.default)();
const port = process.env.PORT || 8080;
new index_1.default(app);
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
