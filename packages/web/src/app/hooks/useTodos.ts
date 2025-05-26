import { useState, useCallback } from 'react';
import { Todo, TodoCreateInput, TodoUpdateInput } from '@todo/shared';
import { apiService } from '../services/api';
import { toast } from 'react-hot-toast';

export const useTodos = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchTodos = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await apiService.getAllTodos();
      setTodos(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch todos'));
      toast.error('Failed to fetch todos');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const addTodo = useCallback(async (todo: TodoCreateInput) => {
    try {
      const newTodo = await apiService.createTodo(todo);
      setTodos(prev => [...prev, newTodo]);
      toast.success('Todo added successfully');
    } catch (err) {
      toast.error('Failed to add todo');
      throw err;
    }
  }, []);

  const updateTodo = useCallback(async (todo: TodoUpdateInput) => {
    try {
      await apiService.updateTodo(todo);
      setTodos(prev =>
        prev.map(t => (t.id === todo.id ? { ...t, ...todo } : t))
      );
      toast.success('Todo updated successfully');
    } catch (err) {
      toast.error('Failed to update todo');
      throw err;
    }
  }, []);

  const deleteTodo = useCallback(async (id: string) => {
    try {
      await apiService.deleteTodo(id);
      setTodos(prev => prev.filter(t => t.id !== id));
      toast.success('Todo deleted successfully');
    } catch (err) {
      toast.error('Failed to delete todo');
      throw err;
    }
  }, []);

  return {
    todos,
    isLoading,
    error,
    fetchTodos,
    addTodo,
    updateTodo,
    deleteTodo,
  };
}; 