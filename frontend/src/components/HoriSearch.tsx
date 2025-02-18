import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function JobSearch() {
  return (
    <div className="py-32 flex justify-center  bg-hero bg-center bg-cover h-[100vh] bg-fixed">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 ">
        <h1 className="text-xl font-semibold text-gray-800">
          Search thousands of fresh jobs
        </h1>

        <input
          type="text"
          placeholder="Job title, skill, company or keyword"
          className="border-b-2 border-gray-300 p-2 w-full mt-2 focus:outline-none"
        />

        <select className="border-b-2 border-gray-300 p-2 w-full mt-4 focus:outline-none">
          <option>Gauteng</option>
          <option>Western Cape</option>
          <option>KwaZulu-Natal</option>
          <option>Eastern Cape</option>
        </select>

        <select className="border-b-2 border-gray-300 p-2 w-full mt-4 focus:outline-none">
          <option>Information Technology</option>
          <option>Engineering</option>
          <option>Finance</option>
          <option>Healthcare</option>
        </select>
        <Link to="/jobs">
          <button className="bg-blue-600 text-white flex items-center justify-center w-full py-3 mt-6 rounded-lg hover:bg-blue-900">
            <FaSearch className="mr-2" />
            SEARCH
          </button>
        </Link>
      </div>
    </div>
  );
}
