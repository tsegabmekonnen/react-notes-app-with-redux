import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getTodoAsync = createAsyncThunk(
  "todos/getTodosAsync",
  async () => {
    const response = await fetch("http://localhost:7000/todos");
    if (response.ok) {
      const todos = await response.json();
      return { todos };
    }
  }
);

export const addTodoAsync = createAsyncThunk(
  "todos/addTodosAsync",
  async (payload) => {
    const response = await fetch("http://localhost:7000/todos", {
      method: "POST",
      headers: {
        "content-Type": "application/json",
      },
      body: JSON.stringify({ title: payload.title }),
    });

    if (response.ok) {
      const todo = await response.json();
      return { todo };
    }
  }
);

export const toggleCompleteAsync = createAsyncThunk(
  "todos/toggleCompleteAsync",
  async (payload) => {
    const response = await fetch(`http://localhost:7000/todos/${payload.id}`, {
      method: "PATCH",
      headers: {
        "content-Type": "application/json",
      },
      body: JSON.stringify({ completed: payload.completed }),
    });

    if (response.ok) {
      const todo = await response.json();
      return { id: todo.id, completed: todo.completed }; //This part gets dispatched as part of an action and the reducer will take care of it (the BL)
    }
  }
);

export const deleteTodoAsync = createAsyncThunk(
  "todos/deleteTodoAsync",
  async (payload) => {
    const response = await fetch(`http://localhost:7000/todos/${payload.id}`, {
      method: "DELETE",
      headers: {
        "content-Type": "application/json",
      },
      // body: JSON.stringify({ completed: payload.completed }),
    });

    if (response.ok) {
      const todos = await response.json();
      return { todos };
    }
  }
);

//this is where we get our action and pass it to the section?
//reducer reacts to the action...takes the current state and do smth and return a new state
//todoSlice is in charge of controlling and updating the todo state
const todoSlice = createSlice({
  name: "todos",
  initialState: [
    //   { id: 1, title: "todo1Local", completed: false },
    //   { id: 2, title: "todo2Local", completed: true },
    //   { id: 3, title: "todo3Local", completed: false },
  ],
  reducers: {
    addTodo: (state, action) => {
      const newTodo = {
        id: Date.now(),
        title: action.payload.title,
        completed: false,
      };
      state.push(newTodo);
    },
    toggleComplete: (state, action) => {
      const index = state.findIndex((todo) => todo.id === action.payload.id);

      state[index].completed = action.payload.completed;
    },
    deleteTodo: (state, action) => {
      return state.filter((todo) => todo.id !== action.payload.id);
    },
  },
  extraReducers: {
    [getTodoAsync.pending]: (state, action) => {
      console.log("fetching data .....");
    },

    //fulfilled refers to completed?
    //Thunk dispatches the fulfilled action => Meaning the api call in our Thunk has been completed and dispatched this action successfully
    [getTodoAsync.fulfilled]: (state, action) => {
      console.log("fetched data successfully.....");
      return action.payload.todos;
    },
    [addTodoAsync.fulfilled]: (state, action) => {
      console.log("added new data successfully.....");
      state.push(action.payload.todo);
    },
    [toggleCompleteAsync.fulfilled]: (state, action) => {
      console.log("updated the toggle complete successfully.....");

      const index = state.findIndex((todo) => todo.id === action.payload.id);
      state[index].completed = action.payload.completed;
    },
    [deleteTodoAsync.fulfilled]: (state, action) => {
      console.log("deleted the todo successfully.....");

      return action.payload.todos;
    },
  },
});

//Redux create actions based on the reducers name. And we are following the naming patter and exposing it so that components themselves can call the reducer actions
export const { addTodo, toggleComplete, deleteTodo } = todoSlice.actions;

//In both cases you are exporting the reducer function. And the below is for the store use (storeConfiguration)
export default todoSlice.reducer;
