import { createSlice } from "@reduxjs/toolkit";

type TTask = {
  id: string;
  task: string;
  date: string;
  isCompleted?: boolean;
};

const initialState = {
  todos: [] as TTask[],
};

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTask: (state, action) => {
      state.todos.push(action.payload);
      // retrieve if any todo stored
      const storedTodos = localStorage.getItem("todos");
      // parse in object
      let parsedTodos = storedTodos
        ? JSON.parse(storedTodos)
        : [...state.todos];
      parsedTodos = state.todos;
      // convert again in string to store in localstorage
      const stringiedTodos = JSON.stringify(parsedTodos);
      // set in localstorage
      localStorage.setItem("todos", stringiedTodos);
    },
    removeTask: (state, action) => {
      const remainedTasks = state.todos.filter(
        (item) => item.id !== action.payload
      );
      state.todos = remainedTasks;
    },
    updateTask: (state, action) => {
      const updateTask = state.todos.find(
        (item) => item.id === action.payload.id
      );
      updateTask!.task = action.payload?.task;
      updateTask!.isCompleted = action.payload?.isCompleted;
      state.todos.sort(
        (item1, item2) => Number(item1.isCompleted) - Number(item2.isCompleted)
      );
    },
  },
});

export const { addTask, removeTask, updateTask } = todoSlice.actions;

export default todoSlice.reducer;
