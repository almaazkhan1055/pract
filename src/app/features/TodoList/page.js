"use client";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createTodo, setTodos } from "./states/todoSlice";
import ListRenderer from "@/app/components/ui/ListRenderer";
import Button from "@/app/components/ui/Button";

const TodoList = () => {
  const [currentFilter, setCurrentFilter] = useState("all");
  const { todoList } = useSelector((state) => state.todo);

  const filters = [
    {
      title: "all",
      handler: () => setCurrentFilter("all"),
    },
    {
      title: "completed",
      handler: () => setCurrentFilter("completed"),
    },
    {
      title: "incompleted",
      handler: () => setCurrentFilter("incompleted"),
    },
  ];

  const renderableTodoList = todoList.filter((todo) => {
    if (currentFilter === "all") {
      return true;
    }

    if (currentFilter === "completed") {
      return todo.completed;
    }

    if (currentFilter === "incompleted") {
      return !todo.completed;
    }
  });

  const hasLoaded = useRef(false);
  const dispatch = useDispatch();

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
        completed: false,
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
      <div className="flex item-center justify-between">
        <h1 className="text-2xl font-medium">Todo List</h1>
        <div className="flex items-center gap-5">
          {filters?.map((filter, index) => (
            <span
              className="cursor-pointer px-5 rounded-full bg-transparent border border-black font-medium hover:bg-black hover:text-white hover:border-white"
              key={index}
              onClick={filter.handler}
            >
              {filter?.title.charAt(0).toUpperCase() + filter?.title.slice(1)}
            </span>
          ))}
        </div>
      </div>
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
        {renderableTodoList?.map((todo) => (
          <ListRenderer key={todo.id} item={todo} />
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
