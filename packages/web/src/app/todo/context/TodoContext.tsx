import React, { createContext, useEffect, useState } from 'react'

const apiUrl = 'http://localhost:8080/api/todos';

interface TodoContextProps {
  todos: Todo[]
  addTodo: (text: string) => void
  deleteTodo: (id: string) => void
  editTodo: (id: string, text: string) => void
  updateTodoStatus: (id: string) => void
}

export interface Todo {
  id?: string
  text: string
  status?: 'undone' | 'completed'
}

export const TodoContext = createContext<TodoContextProps | undefined>(
  undefined,
)

export const TodoProvider = (props: { children: React.ReactNode }) => {
  const [todos, setTodos] = useState<Todo[]>([])

  useEffect(() => {
    async function fetchPosts() {
      const res = await fetch(`${apiUrl}`)
      const data = await res.json()
      setTodos(data)
    }
    fetchPosts()
  }, [])

  // ::: ADD NEW TODO :::
  const addTodo = (text: string) => {
    const newTodo: Todo = {
      text,
      status: 'undone'
    }

    fetch(`${apiUrl}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newTodo)
    })
      .then((res) => res.json())
      .then((savedTodo) => {
        setTodos([...todos, savedTodo])
      }).catch((e: Error) => {
        console.log(e);
      });
  }

  // ::: DELETE A TODO :::
  const deleteTodo = (id: string) => {
    fetch(`${apiUrl}/${id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' }
    })
      .then((res: any) => {
        setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id))
      }).catch((e: Error) => {
        console.log(e);
      });
  }

  // ::: EDIT A TODO :::
  const editTodo = (id: string, text: string) => {
    fetch(`${apiUrl}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, text })
    })
      .then((res: any) => {
        setTodos(prevTodos => {
          return prevTodos.map(todo => {
            if (todo.id === id) {
              return { ...todo, text }
            }
            return todo
          })
        })
      }).catch((e: Error) => {
        console.log(e);
      });
  }

  // ::: UPDATE TODO STATUS :::
  const updateTodoStatus = (id: string) => {
    const todoToUpdate = todos.find(todo => todo.id === id);
    if (!todoToUpdate) return;

    const newStatus = todoToUpdate.status === 'undone' ? 'completed' : 'undone';

    fetch(`${apiUrl}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, status: newStatus })
    })
      .then((res: any) => {
        setTodos(prevTodos => {
          return prevTodos.map(todo => {
            if (todo.id === id) {
              return {
                ...todo,
                status: newStatus,
              }
            }
            return todo
          })
        })
      }).catch((e: Error) => {
        console.log(e);
      });
  }

  const value: TodoContextProps = {
    todos,
    addTodo,
    deleteTodo,
    editTodo,
    updateTodoStatus,
  }

  return (
    <TodoContext.Provider value={value}>{props.children}</TodoContext.Provider>
  )
}
