export type User = {

  firstname: string;
  lastname: string;
  email: string;
  location: string;
  contact: string;
  role: string;
  password: string;
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
  // role: string;
  secretKey?: string | "";
  location: string;
  contact: string;
  // cvUrl: string;
  // profileUrl: string;
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
  exprience: string;
  type: string;
  location: string;
  salary: string;
  requirements: string;
  desc: string;
  category: string;
  applications: string[];
};

export type jobResponse = {
  success : boolean;
  message : string;
  data:Job[];
};
