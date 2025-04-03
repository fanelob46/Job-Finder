import { useState } from "react";
import { FaUpload } from "react-icons/fa";
import { RiAccountBox2Line } from "react-icons/ri";
import { MdOutlinePersonAddAlt } from "react-icons/md";
import { useRegisterMutation } from "../Slices/userApiSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RegisterErrorResponse, UserFormData } from "../definitions";
import { setCredentials } from "../Slices/authSlices";
import SingUpForm from "./SingUpForm";

const SingUp = () => {
  const [register] = useRegisterMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [signUpError, setSignUpError] = useState("");

  const handleSignUp = async (userData: UserFormData) => {
    const {
      firstname,
      lastname,
      email,
      password,
      confirmPassword,
    
      location,
      contact,
    } = userData;

    if (password !== confirmPassword) {
      setSignUpError("Passwords do not match");
      return;
    } else {
      try {
        const res = await register({
          firstname,
          lastname,
          email,
          password,
          contact,
          location,
          role: ""
        }).unwrap();

        dispatch(
          setCredentials({
            ...res,
            cvUrl: "",
            profileUrl: "",
          })
        );
        setSignUpError("");
        if (res.data.role == "admin") {
          navigate("/admin");
        } else {
          navigate("/jobs");
        }
      } catch (error) {
        const errorMessage: RegisterErrorResponse =
          error as RegisterErrorResponse;
        setSignUpError(errorMessage.data.message);
      }
    }
  };
  return (
    <section>
      <SingUpForm
        name="Sign Up"
        type="signup"
        submitFunction={handleSignUp}
        error={signUpError}
      />
    </section>
  );
};

export default SingUp;
