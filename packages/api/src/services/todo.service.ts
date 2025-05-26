import Todo from "../models/todo.model";
import todoRepository from "../repositories/todo.repository";

interface TodoInput {
  text: string;
  status?: 'done' | 'undone';
}

export class TodoService {
  async createTodo(todoData: TodoInput): Promise<Todo> {
    console.log('[Service] Creating todo:', todoData);
    if (!todoData.text) {
      throw new Error("Content cannot be empty!");
    }

    const todo = {
      text: todoData.text,
      status: todoData.status || 'undone'
    };

    const savedTodo = await todoRepository.save(todo as Todo);
    console.log('[Service] Todo created successfully:', savedTodo.toJSON());
    return savedTodo;
  }

  async getAllTodos(text?: string): Promise<Todo[]> {
    console.log('[Service] Getting all todos with text filter:', text);
    const todos = await todoRepository.retrieveAll({ text });
    console.log('[Service] Found todos count:', todos.length);
    return todos;
  }

  async getTodoById(id: number): Promise<Todo> {
    console.log('[Service] Getting todo by id:', id);
    const todo = await todoRepository.retrieveById(id);
    if (!todo) {
      throw new Error(`Cannot find Todo with id=${id}`);
    }
    console.log('[Service] Found todo:', todo.toJSON());
    return todo;
  }

  async updateTodo(id: number, todoData: Partial<TodoInput>): Promise<void> {
    console.log('[Service] Updating todo:', { id, ...todoData });
    
    // First check if todo exists
    await this.getTodoById(id);
    
    const todo = {
      id,
      ...todoData
    };

    const updatedCount = await todoRepository.update(todo as Todo);

    if (updatedCount !== 1) {
      throw new Error(`Cannot update Todo with id=${id}. Todo was not found or data is empty!`);
    }

    console.log('[Service] Todo updated successfully');
  }

  async deleteTodo(id: number): Promise<void> {
    console.log('[Service] Deleting todo:', id);
    
    // First check if todo exists
    await this.getTodoById(id);
    
    const deletedCount = await todoRepository.delete(id);

    if (deletedCount !== 1) {
      throw new Error(`Cannot delete Todo with id=${id}. Todo was not found!`);
    }

    console.log('[Service] Todo deleted successfully');
  }

  async deleteAllTodos(): Promise<number> {
    console.log('[Service] Deleting all todos');
    const count = await todoRepository.deleteAll();
    console.log('[Service] Deleted todos count:', count);
    return count;
  }

  async getCompletedTodos(): Promise<Todo[]> {
    console.log('[Service] Getting completed todos');
    const todos = await todoRepository.retrieveAll({ status: 'done' });
    console.log('[Service] Found completed todos count:', todos.length);
    return todos;
  }
} 