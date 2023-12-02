import { configureStore } from "@reduxjs/toolkit";
import todoReducer from './todoSlice'

//holds our state /and our reducer ... the store
export default configureStore({
reducer: {
    todos: todoReducer,
},
})