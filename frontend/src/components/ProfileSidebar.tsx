import { MdOutlineAccountCircle } from "react-icons/md";
import { RiAccountBox2Line } from "react-icons/ri";
import { MdOutlineCheckBox } from "react-icons/md";



const ProfileSidebar = () => {
  return (
    <div className="bg-white flex justify-center py-52">
      <div className="bg-slate-100   py-3">
        <div className="flex space-x-3">
          <div>
            <MdOutlineAccountCircle className="text-6xl" />
          </div>
          <div>
            <h1>Fanelo Baloyi</h1>
            <button className="px-4  bg-blue-600 text-white rounded cursor-pointer hover:bg-blue-700">
              Edit Profile
            </button>
          </div>
        </div>
        <div className="space-y-4 py-3">
          <div className="flex">
            <button className="flex px-4  bg-blue-500 text-white rounded cursor-pointer hover:bg-blue-700 w-52">
              <RiAccountBox2Line className="text-gray-100 text-2xl" /> Profile
            </button>
          </div>
          <div className="flex">
            <button className="flex px-4  bg-blue-500 text-white rounded cursor-pointer hover:bg-blue-700 w-52">
              <MdOutlineCheckBox className="text-gray-100 text-2xl" /> Jobs Applied
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSidebar;
