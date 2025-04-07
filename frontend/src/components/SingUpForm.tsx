import { MdOutlinePersonAddAlt } from "react-icons/md";
import { UserFormData } from "../definitions";
import { RiAccountBox2Line } from "react-icons/ri";
import { FaUpload } from "react-icons/fa";
import { useState } from "react";

type SignProps = {
  name: string;
  type: "signup" | "login" | "edit";
  submitFunction: (userData: UserFormData) => Promise<void>;
  error: string;
};

const SingUpForm = ({ name, type, submitFunction, error }: SignProps) => {
   const [file, setFile] = useState<File | null>(null);

       const handleFileChange = (
         event: React.ChangeEvent<HTMLInputElement>
       ) => {
         if (event.target.files) {
           setFile(event.target.files[0]);
         }
       };

const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  const formData = new FormData(e.currentTarget);
  const data = {
    firstname: formData.get("firstname")?.toString() || "",
    lastname: formData.get("lastname")?.toString() || "",
    email: formData.get("email")?.toString() || "",
    password: formData.get("password")?.toString() || "",
    confirmPassword: formData.get("confirmPassword")?.toString() || "", 
    location: formData.get("location")?.toString() || "",
    contact: formData.get("contact")?.toString() || "",
  };

  console.log("Data being sent:", data);

  try {
    await submitFunction(data);
  } catch (error) {
    console.error("Error submitting form:", error);
  }
};

  return (
    <>
      <div className="grid grid-cols-2 h-[89vh]">
        <div className="bg-[#516EB8] text-white py-72 grid place-content-center space-y-10">
          <div className="">
            <h1 className="text-2xl">Register</h1>
            <p>Lets set you up</p>
          </div>
          <form className="grid space-y-10">
            <input
              type="text"
              placeholder="First Name"
              name="firstname"
              className=" border-b-2 p-2 rounded-xl text-black"
            />
            <input
              type="text"
              placeholder="Last Name"
              name="lastname"
              className="border-b-2 p-2 rounded-xl text-black"
            />
            <input
              type="text"
              placeholder="Mobile Number"
              name="contact"
              className="border-b-2 p-2  w-full rounded-xl text-black"
            />
            <input
              type="email"
              name="email"
              placeholder="Personal Email Address"
              className="border-b-2 p-2 w-full rounded-xl text-black"
            />
            <input
              type="text"
              placeholder="Location"
              name="location"
              className="border-b-2 p-2  w-full rounded-xl text-black"
            />

            <input
              type="password"
              placeholder="Password"
              name="password"
              className="border-b-2 p-2 w-[630px] rounded-xl text-black"
            />
            <input
              type="password"
              placeholder="Confirm Password"
              name="confirmPassword"
              className="border-b-2 p-2 w-[630px] rounded-xl text-black"
            />
            <div className="flex justify-center">
              <button
                type="submit"
                className=" py-3 px-10 text-sm tracking-wide rounded-xl text-white bg-[#2035AE] hover:bg-blue-700 focus:outline-none"
              >
                Register
              </button>
            </div>
          </form>
        </div>
        <div className="bg-sign bg-center bg-cover h-[13]">
          <h1>baloyi fanelo</h1>
        </div>
      </div>
    </>
  );
};

export default SingUpForm