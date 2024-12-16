import { apiSlice } from "./apiSlice";
const TASKS_URL = "/api";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addTask: builder.mutation({
      query: (data) => ({
        url: `${TASKS_URL}/tasks`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Tasks"],
    }),
    updateTask: builder.mutation({
      query: (data) => ({
        url: `${TASKS_URL}/tasks/${data.taskID}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Tasks"],
    }),
    getUserTask: builder.query({
      query: () => ({
        url: `${TASKS_URL}/tasks`,
      }),
      providesTags: ["Tasks"],
    }),
    deleteTasks: builder.mutation({
      query: (data) => ({
        url: `${TASKS_URL}/tasks/deleteTasks`,
        method: "DELETE",
        body: data,
      }),
      invalidatesTags: ["Tasks"],
    }),
    filterSort: builder.query({
      query: (params) => {
        const queryString = new URLSearchParams(params).toString();
        return `${TASKS_URL}/tasks/filter?${queryString}`;
      },
      invalidatesTags: ["Tasks"],
    }),
  }),
});

export const {
  useAddTaskMutation,
  useUpdateTaskMutation,
  useGetUserTaskQuery,
  useDeleteTasksMutation,
  useFilterSortQuery,
} = userApiSlice;
