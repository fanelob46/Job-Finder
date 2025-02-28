import { FaPhone, FaIdCard } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import { IoLocationOutline } from "react-icons/io5";
import { AiOutlineCar } from "react-icons/ai";
import { BiWorld } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { useEffect, useState } from "react";
import { useGetProfileMutation } from "../Slices/userApiSlice";


const PersonalInfo = () => {


const { userInfo } = useSelector((state: RootState) => state.auth);
// const [firstName, setFirstName] = useState(userInfo?.firstName || "");
// const [lastName, setLastName] = useState(userInfo?.lastName || "");
// const [email, setEmail] = useState(userInfo?.email || "");
// const [location, setLocation] = useState(userInfo?.location || "");




 const dispatch = useDispatch();

 const [getProfile] = useGetProfileMutation();

 console.log("userInfo:", userInfo);

//  useEffect(() => {
//    if (userInfo) {
//      setEmail(userInfo.email );
//      setLocation(userInfo.location);
//    }
//  }, [userInfo]);

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
          <span>{userInfo?.contact}</span>
        </div>
        {/* ID Number */}
        <div className="flex items-center space-x-2">
          <FaIdCard className="text-gray-400" />
          <span>{userInfo?.firstname}</span>
        </div>

        {/* Email Address */}
        <div className="flex items-center space-x-2">
          <MdOutlineEmail className="text-gray-400" />
          <span>{userInfo?.email}</span>
        </div>
        {/* Language */}
        <div className="flex items-center space-x-2">
          <BiWorld className="text-gray-400" />
          <span>Tsonga</span>
        </div>

        {/* Location */}
        <div className="flex items-center space-x-2">
          <IoLocationOutline className="text-gray-400" />
          <span>{userInfo?.location}</span>
        </div>
      

        {/* Citizenship */}
        <div className="flex items-center space-x-2 col-span-2">
          <FaIdCard className="text-gray-400" />
          <span>{userInfo?.lastname}</span>
        </div>
      </div>
    </div>
  );
};

export default PersonalInfo;
