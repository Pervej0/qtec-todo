import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import toast from "react-hot-toast";
import { TTask } from "../../type/index.type";

const initialState = {
  todos: [] as TTask[],
};

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTask: (state, action) => {
      state.todos.push(action.payload);
      state.todos.sort(
        (item1, item2) => Number(item1.isCompleted) - Number(item2.isCompleted)
      );
    },
    removeTask: (state, action) => {
      const remainedTasks = state.todos.filter(
        (item) => item.id !== action.payload
      );
      state.todos = remainedTasks;
      toast.success("Task deleted!");
    },
    updateTask: (state, action) => {
      const updateTask = state.todos.find(
        (item) => item.id === action.payload.id
      );

      updateTask!.task = action?.payload?.task;
      updateTask!.priority = action.payload.priority;
      updateTask!.isCompleted = action.payload?.isCompleted;
      state.todos.sort(
        (item1, item2) => Number(item1.isCompleted) - Number(item2.isCompleted)
      );
      toast.success("Updated successfully!");
      // const stringiedTodos = JSON.stringify(updateTask);
      // localStorage.setItem("todos", stringiedTodos);
    },
  },
});

export const { addTask, removeTask, updateTask } = todoSlice.actions;

export const todos = (state: RootState) => state.todo;

export default todoSlice.reducer;
