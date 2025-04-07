import { Link, useNavigate } from "react-router-dom";
import { UserFormData } from "../definitions";
import { useState } from "react";
import logo from "../assets/logo.jpg";


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
      <div className="grid grid-cols-2 h-[100vh]">
        <div className="bg-header bg-center bg-cover h-[13]">
          <img src={logo} alt="" className="size-36" />
        </div>
        <div className="bg-[#516EB8]">
          <div className="text-white py-72 grid place-content-center space-y-10">
            <div className="">
              <h1 className="text-3xl">Login</h1>
              <p>Lets get started</p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-10 ">
              <input
                name="email"
                type="text"
                required
                className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
                placeholder="Enter user name"
              />
              <input
                name="password"
                type="password"
                required
                className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
                placeholder="Enter password"
              />
              <p className=" text-sm !mt-8 text-center">
                Don't have an account?{" "}
                <Link
                  to={"/signUp"}
                  className=" hover:underline ml-1 whitespace-nowrap font-semibold"
                >
                  Register here
                </Link>
              </p>
              <div className="flex justify-center">
                <button
                  type="submit"
                  className=" py-3 px-10 text-sm tracking-wide rounded-xl text-white bg-[#2035AE] hover:bg-blue-700 focus:outline-none"
                >
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default LogInForm