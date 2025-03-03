import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

export default function HoriSearch() {
  const [searchTerm, setSearchTerm] = useState("");
  const [location, setLocation] = useState("jozi");
  const [category, setCategory] = useState("Information Technology");
  const navigate = useNavigate();

  const handleSearch = () => {
    const queryParams = new URLSearchParams({
      search: searchTerm,
      location,
      category,
    }).toString();
    navigate(`/jobs?${queryParams}`);
  };

  return (
    <div className="py-32 flex justify-center bg-hero bg-center bg-cover h-[100vh] bg-fixed">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h1 className="text-xl font-semibold text-gray-800">
          Search thousands of fresh jobs
        </h1>

        <input
          type="text"
          placeholder="Job title, skill, company or keyword"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border-b-2 border-gray-300 p-2 w-full mt-2 focus:outline-none"
        />

        <select
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="border-b-2 border-gray-300 p-2 w-full mt-4 focus:outline-none"
        >
          <option>Gauteng</option>
          <option>Western Cape</option>
          <option>KwaZulu-Natal</option>
          <option>Eastern Cape</option>
        </select>

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border-b-2 border-gray-300 p-2 w-full mt-4 focus:outline-none"
        >
          <option>Information Technology</option>
          <option>Engineering</option>
          <option>Finance</option>
          <option>Healthcare</option>
        </select>

        <button
          onClick={handleSearch}
          className="bg-blue-600 text-white flex items-center justify-center w-full py-3 mt-6 rounded-lg hover:bg-blue-900"
        >
          <FaSearch className="mr-2" />
          SEARCH
        </button>
      </div>
    </div>
  );
}
