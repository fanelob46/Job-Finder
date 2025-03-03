import { Job, jobResponse } from "../definitions";
import { apiSlice } from "./apiSlice";

export type createJobRequest = {
  title: string;
  type: string;
  location: string;
  category: string;
  salary: string;
  vacancies: string;
  exprience: string;
  desc: string;
  requirements: string;
};

export type createJobResponse = {
  success: boolean;
  message: string;
  data: Job;
};

export type UpdateJobResponse = {
  _id: string;
  title: string;
  type: string;
  location: string;
  category: string;
  salary: string;
  vacancies: string;
  exprience: string;
  desc: string;
  requirements: string;
  applications:[];
};

export type UpdateJobRequest = {
  id?:string;
  title?: string;
  type?: string;
  location?: string;
  category?: string;
  salary?: string;
  vacancies?: string;
  exprience?: string;
  description?: string;
  requirements?: string;
};

export type deleteJobResponse = {
  message: string;
};



export type ApplyForJobResponse = {
  success: boolean;
  message: string;
};

export const jobApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllJobs: builder.query<jobResponse, void>({
      query: () => ({
        url: "http://localhost:5000/api/jobs",
        method: "GET",
      }),
      providesTags: ["Job"],
    }),

    liveFeedJobs: builder.query<jobResponse, void>({
      query: () => ({
        url: "http://localhost:5000/api/jobs/live",
        method: "GET",
      }),
      providesTags: ["Job"],
    }),

    createJob: builder.mutation<createJobResponse, createJobRequest>({
      query: (data) => ({
        url: "http://localhost:5000/api/jobs",
        method: "POST",
        body: data,
      }),
    }),

    updateJob: builder.mutation<
      UpdateJobResponse,
      { id: string; data: UpdateJobRequest }
    >({
      query: ({ id, data }) => ({
        url: `http://localhost:5000/api/jobs/${id}`,
        method: "PUT",
        body: data,
      }),
    }),

    deleteJob: builder.mutation<deleteJobResponse, string>({
      query: (id) => ({
        url: `http://localhost:5000/api/jobs/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useCreateJobMutation,
  useDeleteJobMutation,
  useGetAllJobsQuery,
  useLiveFeedJobsQuery,
  useUpdateJobMutation,

} = jobApiSlice;
