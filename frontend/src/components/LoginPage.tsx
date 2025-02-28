import { Link, useNavigate } from "react-router-dom";
import { useLoginMutation } from "../Slices/userApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { RootState } from "../store";
import { AppDispatch } from "../store";
import { RegisterErrorResponse, UserFormData } from "../definitions";
import { setCredentials } from "../Slices/authSlices";
import LogInForm from "./LogInForm";


const LoginPage = () => {


    const [login] = useLoginMutation();
    const dispatch: AppDispatch = useDispatch();
    const navigate = useNavigate();
    const { userInfo } = useSelector((state: RootState) => state.auth);
    const [loginError, setSLoginError] = useState("");

    useEffect(() => {
      if (userInfo?.role == "admin") {
        navigate("/admin");
      } else if (userInfo?.role == "user") {
        navigate("/jobs");

      }
      return 
    }, [navigate, userInfo]);

    const handleLogin = async (userData: UserFormData) => {
      try {
        const { email, password } = userData;

        const res = await login({ email, password }).unwrap();
             dispatch(setCredentials({
               ...res,
               id: "",
               password: "",
               cvUrl: "",
               profileUrl: ""
             }));


        if (res.role == "admin") {
          navigate("/admin");
        } else {
          navigate("/jobs");
        }
      } catch (error) {
        console.error(error);
        const errorMessage: RegisterErrorResponse =
          error as RegisterErrorResponse;
        setSLoginError(errorMessage.data.message);
      }
    };

  return (
    <div>
      
        <LogInForm
          name="Login"
          type="login"
          submitFunction={handleLogin}
          error={loginError}
        />
      
    </div>
  );
};

export default LoginPage;
