import { Job } from "../definitions";
import { apiSlice } from "./apiSlice";


interface LoginRequest {
  email: string;
  password: string;
}

interface LoginResponse {
  message: string;
  data: User;
}

interface RegisterRequest {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  role: string;
  contact: string;
  location: string;
}

export type GetProfileResponse = {
  data: User;
};

export type GetProfileRequest = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  location: string;
  contact: string;
};

interface RegisterResponse {
  message: string;
  data: User;
}

interface UpdateUserRequest {
  firstname?: string;
  lastname?: string;
  email?: string;
  password?: string;
  location?: string;
  contact?: string;
}

interface UpdateUserResponse {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  role: string;
  location: string;
  contact: string;
  password: string;
}

interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: string;
  contact: string;
  createdAt: string;
  location: string;
  cvUrl: string;
  profileUrl: string;
}

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

export type ApplyForJobRequest = {
  jobId: string;
};

interface GetAllUsersResponse {
  data?: User[];
  success: boolean;
  message: string;
}

interface DeleteUserResponse {
  success: boolean;
  message: string;
}

export type UserApplicationsResponse = {
  success: boolean;
  message: string;
  data: Job[];
};

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (data) => ({
        url: `http://localhost:8080/api/v1/auth/login`,
        method: "POST",
        body: data,
      }),
    }),
    register: builder.mutation<RegisterResponse, RegisterRequest>({
      query: (data) => ({
        url: `http://localhost:8080/api/v1/auth/register`,
        method: "POST",
        body: data,
      }),
    }),
    logout: builder.mutation<void, void>({
      query: () => ({
        url: `http://localhost:8080/api/v1/auth/logout`,
        method: "POST",
      }),
    }),
    updateUser: builder.mutation<UpdateUserResponse, UpdateUserRequest>({
      query: (data) => ({
        url: `http://localhost:8080/api/v1/auth/update`,
        method: "PUT",
        body: data,
      }),
    }),
    getProfile: builder.mutation<GetProfileResponse, GetProfileRequest>({
      query: (data) => ({
        url: "http://localhost:8080/api/v1/user/profile",
        method: "GET",
        body: data,
      }),
    }),

    getAllUsers: builder.query<GetAllUsersResponse, void>({
      query: () => ({
        url: `$http://localhost:8080/api/users/admin`,
        method: "GET",
      }),
      providesTags: ["User"],
    }),

    getUserApplications: builder.query<UserApplicationsResponse, void>({
      query: () => ({
        url: "http://localhost:8080/api/v1/user/job-applications",
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["UserApplications"],
    }),

    applyForJob: builder.mutation<
      { success: boolean; message: string },
      { jobId: string }
    >({
      query: ({ jobId }) => ({
        url: `http://localhost:8080/api/v1/user/apply`,
        method: "POST",
        body: { jobId },
        // credentials: "include",
      }),
    }),

    getJobApplications: builder.query<JobApplicationResponse, void>({
      query: () => ({
        url: "http://localhost:8080/api/v1/user/applications",
        method: "GET",
      }),
      providesTags: ["JobApplication"],
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  useUpdateUserMutation,
  useGetAllUsersQuery,
  useGetProfileMutation,
  useGetUserApplicationsQuery,
  useApplyForJobMutation,
  useGetJobApplicationsQuery,
} = usersApiSlice;
