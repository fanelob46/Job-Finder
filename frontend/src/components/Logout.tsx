import { IoLogOut } from "react-icons/io5";
import { useLogoutMutation } from "../Slices/userApiSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { logout } from "../Slices/authSlices";

const Logout = () => {
  const [logoutApiCall] = useLogoutMutation();
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo } = useSelector((state: RootState) => state.auth);

  const handleLogout = async () => {
    try {
      if (userInfo) {
        await logoutApiCall().unwrap();
        dispatch(logout());
      }
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <span
      onClick={handleLogout}
      className="hover:font-semibold flex items-center gap-5"
    >
      <IoLogOut />
      <p>Logout</p>
    </span>
  );
};

export default Logout;
