"use client";
import React, { useState } from "react";
import Button from "./Button";
import { useDispatch, useSelector } from "react-redux";
import {
  changeTodoStatus,
  deleteTodo,
  startEditingTodo,
  updateTodo,
} from "@/app/features/TodoList/states/todoSlice";

const ListRenderer = ({ item }) => {
  const dispatch = useDispatch();
  const { currentEditingTodo } = useSelector((state) => state.todo);
  const [singleTodoInput, setSingleTodoInput] = useState(item?.title);
  const isEditing = currentEditingTodo === item.id;

  const handleDeleteTodo = () => {
    dispatch(deleteTodo(item));
  };

  const handleEditTodo = () => {
    if (isEditing) {
      dispatch(
        updateTodo({
          id: item.id,
          title: singleTodoInput,
          completed: false,
        }),
      );
    } else {
      setSingleTodoInput(item.title);
      dispatch(startEditingTodo(item.id));
    }
  };

  return (
    <li className="flex items-center justify-between border border-gray-200 px-4 py-2 rounded-xl shadow-lg gap-5">
      <span className="flex gap-2 items-center">
        <label className="relative cursor-pointer">
          <input
            type="checkbox"
            className="peer sr-only"
            checked={item.completed}
            onChange={(e) =>
              dispatch(
                changeTodoStatus({
                  ...item,
                  completed: e.target.checked,
                }),
              )
            }
          />

          <span className="flex h-2 w-2 items-center justify-center rounded-full border border-gray-400 peer-checked:bg-green-300 peer-checked:border-green-300">
            <span className="hidden text-white peer-checked:block"></span>
          </span>
        </label>
        {isEditing ? (
          <input
            className="border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-gray-400 w-full"
            type="text"
            value={singleTodoInput}
            onChange={(e) => setSingleTodoInput(e.target.value)}
          />
        ) : (
          <span>{item?.title}</span>
        )}
      </span>

      <span className="flex items-center gap-2">
        <Button onClick={handleEditTodo}>{isEditing ? "Save" : "Edit"}</Button>
        <Button onClick={handleDeleteTodo}>Delete</Button>
      </span>
    </li>
  );
};

export default ListRenderer;
