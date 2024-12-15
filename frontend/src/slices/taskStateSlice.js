import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tasks: localStorage.getItem("tasks")
    ? JSON.parse(localStorage.getItem("tasks"))
    : [],
};

const taskStateSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action) => {
      state.tasks = [...state.tasks, action.payload];
      localStorage.setItem("tasks", JSON.stringify(state.tasks));
    },
  },
});

export const { addTask } = taskStateSlice.actions;

export default taskStateSlice.reducer;
