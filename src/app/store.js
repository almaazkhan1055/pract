import { configureStore } from "@reduxjs/toolkit";
import todoListReducer from "../app/features/TodoList/states/todoSlice";

export const store = configureStore({
  reducer: {
    todo: todoListReducer,
  },
});
