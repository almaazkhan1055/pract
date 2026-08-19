"use client";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createTodo, setTodos } from "./states/todoSlice";
import ListRenderer from "@/app/components/ui/ListRenderer";
import Button from "@/app/components/ui/Button";

const TodoList = () => {
  const hasLoaded = useRef(false);

  const dispatch = useDispatch();
  const { todoList } = useSelector((state) => state.todo);

  const [input, setInput] = useState("");

  const handleChange = (e) => {
    const { value } = e.target;
    setInput(value);
  };
  const handleAddTodo = (e) => {
    e.preventDefault();

    if (!input.trim()) return;

    dispatch(
      createTodo({
        id: Date.now(),
        title: input,
      }),
    );
    setInput("");
  };

  useEffect(() => {
    if (!hasLoaded.current) {
      const storedTodos = localStorage.getItem("todos");

      if (storedTodos) {
        dispatch(setTodos(JSON.parse(storedTodos)));
      }

      hasLoaded.current = true;
      return;
    }

    localStorage.setItem("todos", JSON.stringify(todoList));
  }, [todoList, dispatch]);

  return (
    <div className="flex flex-col gap-5">
      <h1 className="text-2xl font-medium">Todo List</h1>
      <form
        className="flex items-center justify-between gap-4"
        onSubmit={handleAddTodo}
      >
        <input
          type="text"
          className="border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
          onChange={handleChange}
          name="todoList"
          value={input}
        />

        <Button type="submit">Add</Button>
      </form>
      <ul className="flex flex-col gap-5">
        {todoList?.map((todo) => (
          <ListRenderer key={todo.id} item={todo} />
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
