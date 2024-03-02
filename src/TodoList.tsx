import React, { lazy, useState } from 'react';
//@ts-ignore
import EventBus from 'remoteApp/EventBus';
//@ts-ignore
import { userProfileStore } from 'remoteApp/UserProfileStore';

import './TodoList.css'; // Import the CSS file for styling

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState<string>('');
  const { currentUser } = userProfileStore();
  
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTodo(event.target.value);
  };

  const handleAddTodo = () => {
    if (newTodo.trim() !== '') {
      const newId = todos.length > 0 ? todos[todos.length - 1].id + 1 : 1;
      const newTodoItem: Todo = {
        id: newId,
        text: newTodo,
        completed: false,
      };
      setTodos([...todos, newTodoItem]);
      setNewTodo('');
    }
  };

  const handleToggleTodo = (id: number) => {
    let toDoItem = todos[0];
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        toDoItem = todo;
        return { ...todo, completed: true };
      }
      return todo;
    });
    EventBus.emit('taskName', toDoItem?.text);

    setTodos(updatedTodos);
  };

  const handleDeleteTodo = (id: number) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
    EventBus.emit('deleteToDo');
  };
  return (
    <div className="todo-list-container">
      <h2>Welcome, {currentUser}</h2>
      <h2>Todo List</h2>
      <div className="input-container">
        <input
          type="text"
          value={newTodo}
          onChange={handleInputChange}
          placeholder="Enter a new todo"
        />
        <button onClick={handleAddTodo}>Add Todo</button>
      </div>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => handleToggleTodo(todo.id)}
            />
            <span
              className={todo.completed ? 'completed' : ''}
            >
              {todo.text}
            </span>
            <button onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;