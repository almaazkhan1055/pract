import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  todoList: [],
  currentEditingTodo: null,
};
export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    setTodos: (state, action) => {
      state.todoList = action.payload;
    },

    createTodo: (state, action) => {
      state.todoList.push(action.payload);
    },
    startEditingTodo: (state, action) => {
      state.currentEditingTodo = action.payload;
    },
    updateTodo: (state, action) => {
      const { id, title } = action.payload;
      const todo = state.todoList.find((item) => item.id === id);
      if (todo) {
        todo.title = title;
      }
      state.currentEditingTodo = null;
    },
    deleteTodo: (state, action) => {
      state.todoList = state.todoList.filter(
        (item) => item.id !== action.payload.id,
      );
    },
  },
});

export const {
  createTodo,
  startEditingTodo,
  updateTodo,
  deleteTodo,
  setTodos,
} = todoSlice.actions;
export default todoSlice.reducer;
