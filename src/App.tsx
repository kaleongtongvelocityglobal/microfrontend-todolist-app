import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RemoteAppDirectory from './RemoteAppDirectory';
import TodoList from './ToDoList';

const App = () => {
  return (
    <Router basename="/app">
      <Routes>
        <Route path="/RemoteAppDirectory" element={<RemoteAppDirectory />} />
        <Route path="/TodoList" element={<TodoList />} />
      </Routes>
    </Router>
  );
};

export default App;