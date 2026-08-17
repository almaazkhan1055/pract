"use client";
import Button from "@/app/components/ui/Button";
import SearchInput from "@/app/components/ui/SearchInput";
import React from "react";

const TodoList = () => {
  const handleClick = () => {
    console.log("clicked");
  };
  return (
    <div className="flex flex-col gap-5">
      <h1 className="text-2xl font-medium">Todo List</h1>
      <div className="flex items-center justify-between gap-4">
        <SearchInput />
        <Button onClick={handleClick}>Add</Button>
      </div>
    </div>
  );
};

export default TodoList;
