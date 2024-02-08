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
    },
    removeTask: (state, action) => {
      const remainedTasks = state.todos.filter(
        (item) => item.id !== action.payload
      );
      state.todos = remainedTasks;
    },
    updateTask: (state, action) => {
      // state.todos.map((item) => {
      //   if (item.id === action.payload.id) {
      //     item.task = action.payload?.task;
      //     item.isCompleted = action.payload.isCompleted;
      //     return item;
      //   }
      //   return item;
      // });

      const updateTask = state.todos.find(
        (item) => item.id === action.payload.id
      );
      // console.log(updateTask, "yy");
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
