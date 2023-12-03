import React from "react";
import { useSelector } from "react-redux";

const TotalCompleteItems = () => {
  // const TotalCompletedTodos = useSelector((state) => state.todos).filter((todos) => todos.completed == true).length
  const TotalCompletedTodos = useSelector((state) =>
    state.todos.filter((todos) => todos.completed === true)
  );

  return (
    <h4 className="mt-3">Total Complete Items: {TotalCompletedTodos.length}</h4>
  );
};

export default TotalCompleteItems;
