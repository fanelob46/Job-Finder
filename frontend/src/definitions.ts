export type User = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  location: string;
  contact: string;
  role: string;
};

export type CreateUserResponse = {
  success: boolean;
  message?: string;
};

export type Auth = {
  emailAddress: string;
  password: string;
};

export type UserStore = {
  users: User[];
  user: User;
  setUser: (user: User) => void;
  createUser: (newUser: User) => Promise<CreateUserResponse | null>;
  fetchUsers: () => Promise<void>;
  fetchUser: (id: string) => Promise<void>;
  logoutUser: () => Promise<CreateUserResponse | null>;
};

export const defaultUser = {
  _id: "",
  password: "",
  firstName: "",
  lastName: "",
  email: "",
  contact: "",
  location: "",
  profileUrl: "",
  cvUrl: "",
  role: "User",
};

export type LoginRequest = {
  email: string;
  password: string;
};

export type LoginResponse = {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
};

export type RegisterRequest = {
  name: string;
  email: string;
  password: string;
};

export type RegisterResponse = {
  message: string;
};

export type UpdateUserRequest = {
  name?: string;
  email?: string;
  password?: string;
};

export type UpdateUserResponse = {
  id: string;
  name: string;
  email: string;
};

export type UserFormData = {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: string;
  secretKey?: string | "";
  location: string;
  contact: string;
  cvUrl: string;
  profileUrl: string;
};

export type RegisterErrorResponse = {
  status: number;
  data: {
    success: boolean;
    message: string;
  };
};

export type Job = {
  _id: string;
  title: string;
  

  contact: string;
  type: string;
  location: string;
  salary: string;
};

export type jobResponse = {
  success : boolean;
  message : string;
  data:Partial<Job>[]
};
