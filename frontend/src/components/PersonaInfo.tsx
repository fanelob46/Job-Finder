import { FaPhone, FaIdCard } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import { IoLocationOutline } from "react-icons/io5";
import { AiOutlineCar } from "react-icons/ai";
import { BiWorld } from "react-icons/bi";

const PersonalInfo = () => {
  return (
    <div className="bg-white border rounded-md p-4 shadow-sm">
      {/* Section Title */}
      <h1 className="text-md font-semibold text-gray-800">
        PERSONAL INFORMATION
      </h1>
      <hr className="mt-2 mb-4 border-gray-300" />

      {/* Information Grid */}
      <div className="grid grid-cols-2 gap-y-3 text-gray-700">
        {/* Phone Number */}
        <div className="flex items-center space-x-2">
          <FaPhone className="text-gray-400" />
          <span>+27 736206484</span>
        </div>
        {/* ID Number */}
        <div className="flex items-center space-x-2">
          <FaIdCard className="text-gray-400" />
          <span>9509266454082</span>
        </div>

        {/* Email Address */}
        <div className="flex items-center space-x-2">
          <MdOutlineEmail className="text-gray-400" />
          <span>fanelob46@gmail.com</span>
        </div>
        {/* Language */}
        <div className="flex items-center space-x-2">
          <BiWorld className="text-gray-400" />
          <span>Tsonga</span>
        </div>

        {/* Location */}
        <div className="flex items-center space-x-2">
          <IoLocationOutline className="text-gray-400" />
          <span>Johannesburg, South Africa</span>
        </div>
        {/* Driver's License */}
        <div className="flex items-center space-x-2">
          <AiOutlineCar className="text-gray-400" />
          <span>None</span>
        </div>

        {/* Citizenship */}
        <div className="flex items-center space-x-2 col-span-2">
          <FaIdCard className="text-gray-400" />
          <span>African Male Citizen / Resident with ID</span>
        </div>
      </div>
    </div>
  );
};

export default PersonalInfo;
