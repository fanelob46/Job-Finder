import { FaPhone } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import { IoLocationOutline } from "react-icons/io5";
import { SiLinkedin } from "react-icons/si";


const PersonaInfo = () => {
  return (
    <div>
      <div>
        <h1>PERSONAL INFORMATION</h1>
        <hr />
      </div>
      <div>
        <div className="flex space-x-3">
          <FaPhone />
          <h1>Phone number</h1>
        </div>
        <div className="flex space-x-3">
          <MdOutlineEmail />
          <h1>Email Address</h1>
        </div>
        <div className="flex space-x-3">
          <IoLocationOutline />
          <h1>Location</h1>
        </div>
        <div className="flex space-x-3">
          <SiLinkedin />
          <h1>Profile Url</h1>
        </div>
      </div>
    </div>
  );
};

export default PersonaInfo;
