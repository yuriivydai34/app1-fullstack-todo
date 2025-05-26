import { Todo, TodoCreateInput, TodoUpdateInput } from '@todo/shared';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api';

class ApiService {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private async handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.message || 'An error occurred');
    }
    return response.json();
  }

  async getAllTodos(): Promise<Todo[]> {
    const response = await fetch(`${this.baseUrl}/todos`);
    return this.handleResponse<Todo[]>(response);
  }

  async createTodo(todo: TodoCreateInput): Promise<Todo> {
    const response = await fetch(`${this.baseUrl}/todos`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(todo),
    });
    return this.handleResponse<Todo>(response);
  }

  async updateTodo(todo: TodoUpdateInput): Promise<void> {
    const response = await fetch(`${this.baseUrl}/todos/${todo.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(todo),
    });
    return this.handleResponse<void>(response);
  }

  async deleteTodo(id: string): Promise<void> {
    const response = await fetch(`${this.baseUrl}/todos/${id}`, {
      method: 'DELETE',
    });
    return this.handleResponse<void>(response);
  }
}

export const apiService = new ApiService(API_URL); 