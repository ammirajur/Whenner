import React from "react";
import TodoList from "./TodoList";
import Header from "./common/Header";

const HomePage: React.FC = () => {
  return (
    <div className="App">
      <Header />
      <TodoList />
    </div>
  );
};

export default HomePage;
