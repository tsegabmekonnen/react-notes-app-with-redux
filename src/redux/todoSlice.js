import { createSlice } from "@reduxjs/toolkit";

//this is where we get our action and pass it to the section?
//reducer reacts to the action...takes the current state and do smth and return a new state
//todoSlice is in charge of controlling and updating the todo state
const todoSlice = createSlice({
  name: "todos",
  initialState: [
    { id: 1, title: "todo1", completed: false },
    { id: 2, title: "todo2", completed: true },
    { id: 3, title: "todo3", completed: false },
  ],
  reducers: {
    addTodo: (state, action) => {
        const newTodo = {
            id: Date.now(),
            title: action.payload.title,
            completed: false,
        };
        state.push(newTodo)
    },
    toggleComplete: (state, action) => {
        const index = state.findIndex((todo) => todo.id === action.payload.id);

   state[index].completed = action.payload.completed;
    },
    deleteTodo: (state, action) => {
      return state.filter((todo) => todo.id !== action.payload.id);
    },
  }
});

//Redux create actions based on the reducers name. And we are following the naming patter and exposing it so that components themselves can call the reducer actions
export const { addTodo, toggleComplete, deleteTodo } = todoSlice.actions;

//In both cases you are exporting the reducer function. And the below is for the store use (storeConfiguration)
export default todoSlice.reducer;

