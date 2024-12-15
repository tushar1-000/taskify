import authReducer from "./slices/authSlice";
import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./slices/apiSlice";
import taskStateReducer from "./slices/taskStateSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    tasks: taskStateReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export default store;
