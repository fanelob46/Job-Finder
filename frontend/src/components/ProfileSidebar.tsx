import {
  MdOutlineAccountCircle,
  MdOutlineCheckBox
} from "react-icons/md";
import { RiAccountBox2Line } from "react-icons/ri";
import { Link } from "react-router-dom";
import Logout from "./Logout";


const ProfileSidebar = () => {
  return (
    <div className="flex justify-center py-10 bg-gray-100 min-h-screen">
      <div className="bg-white shadow-md w-64 rounded-lg overflow-hidden">
        {/* Profile Section */}
        <div className="flex flex-col items-center p-4 border-b">
          <MdOutlineAccountCircle className="text-6xl text-gray-500" />
          <h1 className="text-lg font-semibold mt-2">Fanelo Baloyi</h1>
          <Link to={"/profile/edit"}>
            <button className="text-xs bg-blue-600 text-white px-3 py-1 rounded mt-2 hover:bg-blue-700">
              Edit Profile
            </button>
          </Link>
        </div>

        {/* Navigation Items */}
        <div className="py-2">
          <Link to={"/profile/info"}>
            <button className="flex items-center space-x-3 text-white bg-blue-500 px-4 py-3 w-full text-left font-medium">
              <RiAccountBox2Line className="text-lg" />
              <span>Profile</span>
            </button>
          </Link>

          <Link to={"/profile/applied-jobs"}>
            <button className="flex items-center space-x-3 text-gray-700 hover:bg-gray-100 px-4 py-3 w-full text-left font-medium">
              <MdOutlineCheckBox className="text-lg" />
              <span>Applied Jobs</span>
            </button>
          </Link>
          <Link to={"/profile/applied-jobs"}>
            <button className="flex items-center space-x-3 text-gray-700 hover:bg-gray-100 px-4 py-3 w-full text-left font-medium">
              <MdOutlineCheckBox className="text-lg" />
              <Logout/>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProfileSidebar;
