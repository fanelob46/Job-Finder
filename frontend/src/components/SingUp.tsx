import { useState } from "react";
import { FaUpload } from "react-icons/fa";
import { RiAccountBox2Line } from "react-icons/ri";
import { MdOutlinePersonAddAlt } from "react-icons/md";



const SingUp = () => {
   const [file, setFile] = useState<File | null>(null);

   const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
     if (event.target.files) {
       setFile(event.target.files[0]);
     }
   };

   return (
     <div className="max-w-2xl mx-auto p-6 bg-white ">
       <div className="py-10">
         <h2 className="text-xl font-semibold mb-4">CREATE PROFILE</h2>
         <hr />
       </div>

       <p className="text-gray-600 text-sm mb-4">
         Once you’ve uploaded your CV, we’ll try to prefill your profile.
       </p>
       <div className="flex items-center space-x-4 mb-6">
         <label
           htmlFor="cv-upload"
           className="flex items-center px-4 py-2 bg-blue-600 text-white rounded cursor-pointer hover:bg-blue-700"
         >
           <FaUpload className="mr-2" /> UPLOAD A CV
         </label>
         <input
           type="file"
           id="cv-upload"
           className="hidden"
           onChange={handleFileChange}
           accept=".pdf,.doc,.docx"
         />
         <span className="text-gray-500 text-sm">
           {file ? file.name : "No file selected yet"}
         </span>
       </div>
       <p className="text-gray-400 text-xs">Word or PDF, 5MB max.</p>
       <div className="py-5 flex space-x-2">
         <RiAccountBox2Line className="text-blue-700 text-2xl" />

         <h1>PERSONAL INFO</h1>
       </div>

       <form className="mt-6 grid grid-cols-2 gap-4">
         <input
           type="text"
           placeholder="First Name"
           className=" border-b-2 p-2 "
         />
         <input
           type="text"
           placeholder="Last Name"
           className="border-b-2 p-2"
         />
         <div className="col-span-2 flex space-x-5">
           <input
             type="text"
             placeholder="Mobile Number"
             className="border-b-2 p-2  w-full "
           />
           <input
             type="email"
             placeholder="Personal Email Address"
             className="border-b-2 p-2 w-full "
           />
         </div>

         <input
           type="text"
           placeholder="Location"
           className="border-b-2 p-2  w-full"
         />

         <input
           type="text"
           placeholder="Profile Url"
           className="border-b-2 p-2  w-full"
         />

         <div>
           <div className="py-5 flex space-x-2">
             <MdOutlinePersonAddAlt className="text-blue-700 text-2xl" />
             <h1>Account</h1>
           </div>

           <input
             type="password"
             placeholder="Password"
             className="border-b-2 p-2 w-[630px]"
           />
           <div className="py-5 pl-[550px]">
             <button className="px-4 py-2 bg-blue-600 text-white rounded cursor-pointer hover:bg-blue-700">
               CREATE
             </button>
           </div>
         </div>
       </form>
     </div>
   );
};

export default SingUp;
