import React from "react";
import { useDispatch } from "react-redux";
import { deleteTodo, toggleComplete, toggleCompleteAsync, deleteTodoAsync } from "../redux/todoSlice";

const TodoItem = ({ id, title, completed }) => {
  const dispatch = useDispatch();

  const handleCompleteClick = () => {
	//without api call with thunk midlware
    // dispatch(
    //   toggleComplete({
    //     id: id,
    //     completed: !completed,
    //   })
    // );
	dispatch(toggleCompleteAsync({
		id: id,
		completed: !completed
	}))
  };

  const handleDeleteClick = () => {
    // dispatch(
    //   deleteTodo({
    //     id: id,
    //   })
    // );
	dispatch(
		deleteTodoAsync({
			id: id,
		})
	)
  };

  return (
    <li className={`list-group-item ${completed && "list-group-item-success"}`}>
      <div className="d-flex justify-content-between">
        <span className="d-flex align-items-center">
          <input
            type="checkbox"
            className="mr-3"
            checked={completed}
            onChange={handleCompleteClick}
          ></input>
          {title}
        </span>
        <button className="btn btn-danger" onClick={handleDeleteClick}>
          Delete
        </button>
      </div>
    </li>
  );
};

export default TodoItem;
