import { Link, useNavigate } from "react-router-dom";
import { UserFormData } from "../definitions";
import { useState } from "react";

type LoginProps = {
  name: string;
  type: "signup" | "login" | "edit";
  submitFunction: (userData: UserFormData) => Promise<void>;
  error: string;
};


const LogInForm = ({ name, type, submitFunction, error }: LoginProps) => {

 const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
   e.preventDefault();

   const formData = new FormData(e.currentTarget);
   const data = {
     firstname: formData.get("firstname")?.toString() || "",
     lastname: formData.get("lastname")?.toString() || "",
     email: formData.get("email")?.toString() || "",
     password: formData.get("password")?.toString() || "",
     confirmPassword: formData.get("confirmPassword")?.toString() || "",
     role: formData.get("role")?.toString() || "",
     location: formData.get("location")?.toString() || "",
     contact: formData.get("contact")?.toString() || "",
     profileUrl: formData.get("profileUrl")?.toString() || "",
     cvUrl : formData.get("cvUrl")?.toString() || ""
   };

   console.log(data);

   try {
     await submitFunction(data);
   } catch (error) {
     console.error("Error submitting form:", error);
   }
 };

  return (
    <>

    
      <div className="py-20 px-20 bg-white  gird place-items-center">
        <div className="pr-56">
          <h1>SIGN IN</h1>
          <hr className="w-[750px]" />
        </div>

        <form
          className="mt-8 space-y-4 border border-gray-400 px-10 py-10 bg-[#f8f4f4] "
          onSubmit={handleSubmit}
        >
          <div>
            <label className="text-gray-800 text-sm mb-2 block">
              User name
            </label>
            <div className="relative flex items-center">
              <input
                name="email"
                type="text"
                required
                className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
                placeholder="Enter user name"
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="#bbb"
                stroke="#bbb"
                className="w-4 h-4 absolute right-4"
                viewBox="0 0 24 24"
              >
                <circle cx="10" cy="7" r="6" data-original="#000000"></circle>
                <path
                  d="M14 15H6a5 5 0 0 0-5 5 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 5 5 0 0 0-5-5zm8-4h-2.59l.3-.29a1 1 0 0 0-1.42-1.42l-2 2a1 1 0 0 0 0 1.42l2 2a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42l-.3-.29H22a1 1 0 0 0 0-2z"
                  data-original="#000000"
                ></path>
              </svg>
            </div>
          </div>

          <div>
            <label className="text-gray-800 text-sm mb-2 block">Password</label>
            <div className="relative flex items-center">
              <input
                name="password"
                type="password"
                required
                className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
                placeholder="Enter password"
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="#bbb"
                stroke="#bbb"
                className="w-4 h-4 absolute right-4 cursor-pointer"
                viewBox="0 0 128 128"
              >
                <path
                  d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z"
                  data-original="#000000"
                ></path>
              </svg>
            </div>
          </div>

          <div className="!mt-8">
            <button
              type="submit"
              className="w-full py-3 px-4 text-sm tracking-wide rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
            >
              Sign in
            </button>
          </div>
          <p className="text-gray-800 text-sm !mt-8 text-center">
            Don't have an account?{" "}
            <Link
              to={"/signUp"}
              className="text-blue-600 hover:underline ml-1 whitespace-nowrap font-semibold"
            >
              Register here
            </Link>
          </p>
        </form>
      </div>
    </>
  );
};

export default LogInForm