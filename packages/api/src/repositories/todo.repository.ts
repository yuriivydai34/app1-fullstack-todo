import { Op } from "sequelize";
import Todo from "../models/todo.model";

interface ITodoRepository {
  save(todo: Todo): Promise<Todo>;
  retrieveAll(searchParams?: {text?: string, status?: string}): Promise<Todo[]>;
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
    console.log('[Repository] Attempting to save todo:', todo);
    try {
      const savedTodo = await Todo.create({
        text: todo.text,
        status: todo.status || 'undone'
      });
      console.log('[Repository] Successfully saved todo:', savedTodo.toJSON());
      return savedTodo;
    } catch (err) {
      console.error('[Repository] Error saving todo:', err);
      throw new Error("Failed to create Todo!");
    }
  }

  async retrieveAll(searchParams?: {text?: string, status?: string}): Promise<Todo[]> {
    console.log('[Repository] Retrieving all todos with params:', searchParams);
    try {
      let condition: SearchCondition = {};

      if (searchParams?.status) {
        condition.status = searchParams.status;
      }

      if (searchParams?.text) {
        condition.text = { [Op.like]: `%${searchParams.text}%` };
      }

      console.log('[Repository] Using search condition:', condition);
      const todos = await Todo.findAll({ where: condition });
      console.log('[Repository] Retrieved todos count:', todos.length);
      return todos;
    } catch (error) {
      console.error('[Repository] Error retrieving todos:', error);
      throw new Error("Failed to retrieve Todos!");
    }
  }

  async retrieveById(todoId: number): Promise<Todo | null> {
    console.log('[Repository] Retrieving todo by id:', todoId);
    try {
      const todo = await Todo.findByPk(todoId);
      console.log('[Repository] Retrieved todo:', todo?.toJSON() || 'not found');
      return todo;
    } catch (error) {
      console.error('[Repository] Error retrieving todo by id:', error);
      throw new Error(`Failed to retrieve Todo with id=${todoId}!`);
    }
  }

  async update(todo: Todo): Promise<number> {
    console.log('[Repository] Attempting to update todo:', todo);
    const { id, text, status } = todo;

    try {
      const updateData: { text?: string; status?: string } = {};
      if (text !== undefined) updateData.text = text;
      if (status !== undefined) updateData.status = status;

      console.log('[Repository] Update data:', updateData);
      const [affectedRows] = await Todo.update(
        updateData,
        { where: { id: id } }
      );
      console.log('[Repository] Updated rows:', affectedRows);
      return affectedRows;
    } catch (error) {
      console.error('[Repository] Error updating todo:', error);
      throw new Error("Failed to update Todo!");
    }
  }

  async delete(todoId: number): Promise<number> {
    console.log('[Repository] Attempting to delete todo:', todoId);
    try {
      const affectedRows = await Todo.destroy({ where: { id: todoId } });
      console.log('[Repository] Deleted rows:', affectedRows);
      return affectedRows;
    } catch (error) {
      console.error('[Repository] Error deleting todo:', error);
      throw new Error("Failed to delete Todo!");
    }
  }

  async deleteAll(): Promise<number> {
    console.log('[Repository] Attempting to delete all todos');
    try {
      const affectedRows = await Todo.destroy({
        where: {},
        truncate: false
      });
      console.log('[Repository] Deleted all rows:', affectedRows);
      return affectedRows;
    } catch (error) {
      console.error('[Repository] Error deleting all todos:', error);
      throw new Error("Failed to delete Todos!");
    }
  }
}

export default new TodoRepository();
