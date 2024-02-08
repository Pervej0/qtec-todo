import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

type TTask = {
  id: string;
  task: string;
  date: string;
  isCompleted?: boolean;
};

// const getAllTodos = localStorage.getItem("todos");
// const parsedTodos = !getAllTodos?.length ? JSON.parse(getAllTodos!) : [];

const initialState = {
  todos: [] as TTask[],
};
console.log(initialState);

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
      // const stringiedTodos = JSON.stringify(remainedTasks);
      // localStorage.setItem("todos", stringiedTodos);
    },
    updateTask: (state, action) => {
      const updateTask = state.todos.find(
        (item) => item.id === action.payload.id
      );

      updateTask!.task = action?.payload?.task;
      updateTask!.isCompleted = action.payload?.isCompleted;
      state.todos.sort(
        (item1, item2) => Number(item1.isCompleted) - Number(item2.isCompleted)
      );
      // const stringiedTodos = JSON.stringify(updateTask);
      // localStorage.setItem("todos", stringiedTodos);
    },
  },
});

export const { addTask, removeTask, updateTask } = todoSlice.actions;

export const todos = (state: RootState) => state.todo;

export default todoSlice.reducer;
