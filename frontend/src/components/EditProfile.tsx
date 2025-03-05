import { FormEvent, useEffect, useState } from "react";
import { setCredentials } from "../Slices/authSlices";
import { useDispatch, useSelector } from "react-redux";
import { useUpdateUserMutation } from "../Slices/userApiSlice";
import { RootState } from "../store";

const EditProfile = () => {
  const { userInfo } = useSelector((state: RootState) => state.auth);

  // Local state for form fields
  const [firstname, setFirstName] = useState(userInfo?.firstname || "");
  const [lastname, setLastName] = useState(userInfo?.lastname || "");
  const [email, setEmail] = useState(userInfo?.email || "");
  const [location, setLocation] = useState(userInfo?.location || "");
  const [contact, setContact] = useState(userInfo?.contact || "");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const dispatch = useDispatch();
  const [updateProfile] = useUpdateUserMutation();

  // Sync local state with Redux state
  useEffect(() => {
    if (userInfo) {
      setFirstName(userInfo.firstname);
      setLastName(userInfo.lastname);
      setEmail(userInfo.email);
      setLocation(userInfo.location);
      setContact(userInfo.contact);
    }
  }, [userInfo]);
  console.log(userInfo);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password && password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const res = await updateProfile({
        firstname,
        lastname,
        email,
        location,
        contact,
        password: password || undefined,
      }).unwrap();

      // Update Redux state
      dispatch(setCredentials({
        ...res,
        cvUrl: "",
        profileUrl: ""
      }));
console.log(res)
      // Clear error and show success message
      setError("");
      setSuccess("Profile updated successfully");
    } catch (err) {
      setError("Failed to update profile");
      console.error(err);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="py-10">
        <h2 className="text-xl font-semibold mb-4">EDIT PROFILE</h2>
        <hr />
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}
      {success && <p className="text-green-500 text-sm">{success}</p>}

      <form className="mt-6 grid grid-cols-2 gap-4" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="First Name"
          className="border-b-2 p-2"
          value={firstname}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Last Name"
          className="border-b-2 p-2"
          value={lastname}
          onChange={(e) => setLastName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Location"
          className="border-b-2 p-2 w-full"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <input
          type="text"
          placeholder="Contact"
          className="border-b-2 p-2 w-full"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          className="border-b-2 p-2 w-full"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="border-b-2 p-2 w-full"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Confirm Password"
          className="border-b-2 p-2 w-full"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded cursor-pointer hover:bg-blue-700"
        >
          UPDATE
        </button>
      </form>
    </div>
  );
};

export default EditProfile;
