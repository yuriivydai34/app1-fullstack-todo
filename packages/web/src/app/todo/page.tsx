'use client'

import { TodoProvider } from './context'
import App from './App';

export default function Main() {
  return (
    <div>
      <TodoProvider>
        <App />
      </TodoProvider>
    </div>
  );
}
