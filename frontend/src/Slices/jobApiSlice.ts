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
  id: string;
  title: string;
  type: string;
  location: string;
  category: string;
  salary: string;
  vacansies: string;
  exprience: string;
  description: string;
  requirements: string;
};

export type UpdateJobRequest = {
  title?: string;
  type?: string;
  location?: string;
  category?: string;
  salary?: string;
  vacansies?: string;
  exprience?: string;
  description?: string;
  requirements?: string;
};

export type deleteJobResponse = {
  message: string;
};

// Define the Job Application Response Type
export type JobApplicationResponse = {
  success: boolean;
  data: {
    jobId: string;
    title: string;
    applicantsCount: number;
    applicants: {
      firstname: string;
      lastname: string;
      email: string;
    }[];
  }[];
};

// Define User Applied Jobs Response Type
export type UserApplicationsResponse = {
  success: boolean;
  message: string;
  data: Job[];
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
    updateJob: builder.mutation<UpdateJobResponse, UpdateJobRequest>({
      query: (id) => ({
        url: `http://localhost:5000/api/jobs/${id}`,
        method: "PUT",
      }),
    }),
    deleteJob: builder.mutation<deleteJobResponse, string>({
      query: (id) => ({
        url: `http://localhost:5000/api/jobs/${id}`,
        method: "DELETE",
      }),
    }),

    getJobApplications: builder.query<JobApplicationResponse, void>({
      query: () => ({
        url: "http://localhost:5000/api/jobs/applications",
        method: "GET",
      }),
      providesTags: ["JobApplication"],
    }),

    
    getUserApplications: builder.query<UserApplicationsResponse, void>({
      query: () => ({
        url: "http://localhost:5000/api/jobs/user-applications",
        method: "GET",
        credentials: "include", 
      }),
      providesTags: ["UserApplications"],
    }),
  }),
});

export const {
  useCreateJobMutation,
  useDeleteJobMutation,
  useGetAllJobsQuery,
  useLiveFeedJobsQuery,
  useUpdateJobMutation,
  useGetJobApplicationsQuery, 
  useGetUserApplicationsQuery, 
} = jobApiSlice;
