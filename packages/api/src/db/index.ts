import { Sequelize } from "sequelize-typescript";
import { config, dialect } from "../config/db.config";
import Todo from "../models/todo.model";

class Database {
  public sequelize: Sequelize | undefined;

  constructor() {
    console.log('[Database] Initializing database...');
    this.connectToDatabase();
  }

  private async connectToDatabase() {
    try {
      console.log('[Database] Starting connection with config:', {
        host: config.HOST,
        database: config.DB,
        username: config.USER,
        dialect: dialect,
        pool: config.pool
      });

      this.sequelize = new Sequelize({
        database: config.DB,
        username: config.USER,
        password: config.PASSWORD,
        host: config.HOST,
        dialect: dialect,
        pool: {
          max: config.pool.max,
          min: config.pool.min,
          acquire: config.pool.acquire,
          idle: config.pool.idle
        },
        models: [Todo],
        logging: (msg) => console.log('[Database SQL]:', msg)
      });

      console.log('[Database] Created Sequelize instance');

      await this.sequelize.authenticate();
      console.log("[Database] Connection authenticated successfully");

      await this.sequelize.sync();
      console.log("[Database] Models synchronized with database");

    } catch (err) {
      console.error("[Database] Connection error:", err);
      throw err;
    }
  }
}

export default Database;
