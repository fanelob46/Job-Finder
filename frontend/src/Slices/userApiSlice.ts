import { apiSlice } from "./apiSlice";

const USERS_URL = "/api/users";
const ADMIN_URL = "/api/";

// Define the types for the request payloads and responses
interface LoginRequest {
  email: string;
  password: string;
}

interface LoginResponse {
  success : boolean;
  message: string
  _id : string;
  firstname: string;
  lastname: string;
  role: string;
  location: string;
  contact: string;
  email: string;
}

interface RegisterRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: string;
  location: string;
  cvUrl: string;
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
  id: string;
  firstName: string;
  lastName: string;
  password: string;
  email: string;
  role: string;
}

interface UpdateUserRequest {
  firstName?: string;
  lastName?: string;
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
  cvUrl: string;
  profileUrl: string;
  password:string
}

interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: string;
  contact:string;
  createdAt: string;
  location: string;
  cvUrl: string;
  profileUrl:string;
}

interface GetAllUsersResponse {
  data?: User[];
  success: boolean;
  message: string;
}

interface DeleteUserResponse {
  success: boolean;
  message: string;
}

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (data) => ({
        url: `http://localhost:5000/api/users/login`,
        method: "POST",
        body: data,
      }),
    }),
    register: builder.mutation<RegisterResponse, RegisterRequest>({
      query: (data) => ({
        url: `http://localhost:5000/api/users/logout`,
        method: "POST",
        body: data,
      }),
    }),
    logout: builder.mutation<void, void>({
      query: () => ({
        url: `${USERS_URL}/logout`,
        method: "POST",
      }),
    }),
    updateUser: builder.mutation<UpdateUserResponse, UpdateUserRequest>({
      query: (data) => ({
        url: `http://localhost:5000/api/users/profile`,
        method: "PUT",
        body: data,
      }),
    }),
    getProfile: builder.mutation<GetProfileResponse, GetProfileRequest>({
      query: (data) => ({
        url: "http://localhost:5000/api/users/profile",
        method: "GET",
        body: data,
      }),
    }),

    getAllUsers: builder.query<GetAllUsersResponse, void>({
      query: () => ({
        url: `$http://localhost:5000/api/users/admin`,
        method: "GET",
      }),
      providesTags: ["User"],
    }),

    deleteUser: builder.mutation<DeleteUserResponse, string>({
      query: (id) => ({
        url: `${ADMIN_URL}/admin/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  useUpdateUserMutation,
  useGetAllUsersQuery,
  useDeleteUserMutation,
  useGetProfileMutation
} = usersApiSlice;
