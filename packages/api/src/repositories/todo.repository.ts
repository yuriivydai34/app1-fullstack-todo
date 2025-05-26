import { Op } from "sequelize";
import Todo from "../models/todo.model";

interface ITodoRepository {
  save(todo: Todo): Promise<Todo>;
  retrieveAll(searchParams: {text: string, status: boolean}): Promise<Todo[]>;
  retrieveById(todoId: number): Promise<Todo | null>;
  update(todo: Todo): Promise<number>;
  delete(todoId: number): Promise<number>;
  deleteAll(): Promise<number>;
}

interface SearchCondition {
  [key: string]: any;
}

class TodoRepository implements ITodoRepository {
  async save(todo: Todo): Promise<Todo> {
    try {
      return await Todo.create({
        text: todo.text,
        status: todo.status
      });
    } catch (err) {
      throw new Error("Failed to create Todo!");
    }
  }

  async retrieveAll(searchParams: {text?: string, status?: boolean}): Promise<Todo[]> {
    try {
      let condition: SearchCondition = {};

      if (searchParams?.status) condition.status = true;

      if (searchParams?.text)
        condition.text = { [Op.iLike]: `%${searchParams.text}%` };

      return await Todo.findAll({ where: condition });
    } catch (error) {
      throw new Error("Failed to retrieve Todos!");
    }
  }

  async retrieveById(todoId: number): Promise<Todo | null> {
    try {
      return await Todo.findByPk(todoId);
    } catch (error) {
      throw new Error("Failed to retrieve Todos!");
    }
  }

  async update(todo: Todo): Promise<number> {
    const { id, text, status } = todo;

    try {
      const affectedRows = await Todo.update(
        { text, status },
        { where: { id: id } }
      );

      return affectedRows[0];
    } catch (error) {
      throw new Error("Failed to update Todo!");
    }
  }

  async delete(todoId: number): Promise<number> {
    try {
      const affectedRows = await Todo.destroy({ where: { id: todoId } });

      return affectedRows;
    } catch (error) {
      throw new Error("Failed to delete Todo!");
    }
  }

  async deleteAll(): Promise<number> {
    try {
      return Todo.destroy({
        where: {},
        truncate: false
      });
    } catch (error) {
      throw new Error("Failed to delete Todos!");
    }
  }
}

export default new TodoRepository();
