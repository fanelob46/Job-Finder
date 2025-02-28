import { RiAccountBox2Line } from "react-icons/ri";
import { MdOutlinePersonAddAlt } from "react-icons/md";
import { FaUpload } from "react-icons/fa";
import { FormEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { useUpdateUserMutation } from "../Slices/userApiSlice";
import { setCredentials } from "../Slices/authSlices";

const EditProfile = () => {
  const { userInfo } = useSelector((state: RootState) => state.auth);

  const [firstName, setFirstName] = useState(userInfo?.firstname || "");
  const [lastName, setLastName] = useState(userInfo?.lastname || "");
  const [email, setEmail] = useState(userInfo?.email || "");
  const [location, setLocation] = useState(userInfo?.location || "");
  const [contact, setContact] = useState(userInfo?.contact || "");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const dispatch = useDispatch();
  const [updateProfile] = useUpdateUserMutation();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password && password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const res = await updateProfile({
        firstName,
        lastName,
        email,

        location,
        contact,
        password: password || undefined, // Only update password if provided
      }).unwrap();
      dispatch(setCredentials({ ...res }));
      // Save the updated profile info
      setError("");
      setSuccess("Profile updated successfully");
    } catch (err) {
      setError("Failed to update profile");
      console.error(err);
    }
  };

  console.log(userInfo);

  const [file, setFile] = useState<File | null>(null);
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
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

      <p className="text-gray-600 text-sm mb-4">
        Once you’ve uploaded your CV, we’ll try to prefill your profile.
      </p>

      <div className="flex items-center space-x-4 mb-6">
        <label
          htmlFor="cv-upload"
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded cursor-pointer hover:bg-blue-700"
        >
          <FaUpload className="mr-2" /> REPLACE A CV
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

      <form className="mt-6 grid grid-cols-2 gap-4" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="First Name"
          className="border-b-2 p-2"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Last Name"
          className="border-b-2 p-2"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />

        <div className="col-span-2 flex space-x-5">
          <input
            type="text"
            placeholder="Mobile Number"
            className="border-b-2 p-2 w-full"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
          />
          <input
            type="email"
            placeholder="Personal Email Address"
            className="border-b-2 p-2 w-full"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <input
          type="text"
          placeholder="Location"
          className="border-b-2 p-2 w-full"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />

        <input
          type="text"
          placeholder="Profile Url"
          className="border-b-2 p-2 w-full"
        />

        <div className="col-span-2">
          <div className="py-5 flex space-x-2">
            <MdOutlinePersonAddAlt className="text-blue-700 text-2xl" />
            <h1>Account</h1>
          </div>

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

          <div className="py-5 flex justify-end">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded cursor-pointer hover:bg-blue-700"
            >
              UPDATE
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditProfile;
