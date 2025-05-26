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
const sequelize_typescript_1 = require("sequelize-typescript");
const db_config_1 = require("../config/db.config");
const todo_model_1 = __importDefault(require("../models/todo.model"));
class Database {
    constructor() {
        console.log('[Database] Initializing database...');
        this.connectToDatabase();
    }
    connectToDatabase() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log('[Database] Starting connection with config:', {
                    host: db_config_1.config.HOST,
                    database: db_config_1.config.DB,
                    username: db_config_1.config.USER,
                    dialect: db_config_1.dialect,
                    pool: db_config_1.config.pool
                });
                this.sequelize = new sequelize_typescript_1.Sequelize({
                    database: db_config_1.config.DB,
                    username: db_config_1.config.USER,
                    password: db_config_1.config.PASSWORD,
                    host: db_config_1.config.HOST,
                    dialect: db_config_1.dialect,
                    pool: {
                        max: db_config_1.config.pool.max,
                        min: db_config_1.config.pool.min,
                        acquire: db_config_1.config.pool.acquire,
                        idle: db_config_1.config.pool.idle
                    },
                    models: [todo_model_1.default],
                    logging: (msg) => console.log('[Database SQL]:', msg)
                });
                console.log('[Database] Created Sequelize instance');
                yield this.sequelize.authenticate();
                console.log("[Database] Connection authenticated successfully");
                yield this.sequelize.sync();
                console.log("[Database] Models synchronized with database");
            }
            catch (err) {
                console.error("[Database] Connection error:", err);
                throw err;
            }
        });
    }
}
exports.default = Database;
