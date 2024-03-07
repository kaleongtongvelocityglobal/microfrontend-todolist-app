import React, { useState } from 'react';
//@ts-ignore
import { useAtom } from 'remoteApp/UserProfile';
//@ts-ignore
import { useAtom as useToDoListAtom } from 'remoteApp/ToDoList';

import './TodoList.css'; // Import the CSS file for styling

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

const TodoList: React.FC = () => {
  const [newTodo, setNewTodo] = useState<string>('');
  const [username] = useAtom("name")
  const [atomList, setAtomList] = useToDoListAtom("todolist");

  
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTodo(event.target.value);
  };

  const handleAddTodo = () => {
    if (newTodo.trim() !== '') {
      const newId = atomList.length > 0 ? atomList[atomList.length - 1].id + 1 : 1;
      const newTodoItem: Todo = {
        id: newId,
        text: newTodo,
        completed: false,
      };
      setAtomList([...atomList, newTodoItem]);
      setNewTodo('');
    }
  };

  const handleToggleTodo = (id: number) => {
    const updatedTodos = atomList.map((todo) => {
      if (todo.id === id) {
        return { ...todo, completed: true };
      }
      return todo;
    });

    setAtomList(updatedTodos);
  };

  const handleDeleteTodo = (id: number) => {
    const updatedTodos = atomList.filter((todo) => todo.id !== id);
    setAtomList(updatedTodos);
  };

  return (
    <div className="todo-list-container">
      <h2>Welcome, {username}</h2>
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
        {atomList?.map((todo) => (
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