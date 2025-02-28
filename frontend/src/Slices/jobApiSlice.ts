import { Job, jobResponse } from "../definitions";
import { apiSlice } from "./apiSlice";

export type createJobRequest = {
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

export type deleteJobResponse ={
  message: string;
}

export const jobApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllJobs: builder.query<jobResponse, void>({
      query: () => ({
        url: "http://localhost:5000/api/jobs",
        method: "GET",
        
      }),
    
    }),
    createJob: builder.mutation<createJobResponse,createJobRequest>({
      query: (data) => ({
        url: "http://localhost:5000/api/jobs",
        method: "POST",
        body: data,
      }),
    }),
    updateJob: builder.mutation<UpdateJobResponse,UpdateJobRequest>({
      query: (id) => ({
        url: `http://localhost:5000/api/jobs${id}`,
        method: "PUT",
        
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
  useGetAllJobsQuery ,
  useUpdateJobMutation
 } = jobApiSlice