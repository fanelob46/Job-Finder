import { useState } from "react";
import { useLiveFeedJobsQuery } from "../Slices/jobApiSlice";
import { useApplyForJobMutation } from "../Slices/userApiSlice";
import { FaMoneyBillWave } from "react-icons/fa6";
import { FaFileAlt } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { BiSolidCategoryAlt } from "react-icons/bi";




const JobCard = () => {
  const { data, error, isLoading } = useLiveFeedJobsQuery();
  const [applyForJob] = useApplyForJobMutation();
  const [applying, setApplying] = useState<string | null>(null);

   console.log(data)
  // State for search inputs
  const [searchTitle, setSearchTitle] = useState("");
  const [searchLocation, setSearchLocation] = useState("");
  const [searchCategory, setSearchCategory] = useState("");

  // Handle apply logic
  const handleApply = async (jobId: string) => {
    try {
      setApplying(jobId); // Mark the job as applying
      await applyForJob({ jobId }).unwrap(); // Call the mutation and unwrap to get response or throw error
      alert("Application submitted successfully!");
    } catch (err: any) {
      alert(err?.data?.message || "Failed to apply. Try again.");
    } finally {
      setApplying(null); // Reset applying state after application attempt
    }
  };

  // Filter jobs based on search terms
  const filteredJobs = data?.data?.filter((job) => {
    const matchesTitle = job.title
      ? job.title.toLowerCase().includes(searchTitle.toLowerCase())
      : false;

    const matchesLocation = job.location
      ? job.location.toLowerCase().includes(searchLocation.toLowerCase())
      : false;

    const matchesCategory = job.category
      ? job.category.toLowerCase().includes(searchCategory.toLowerCase())
      : false;

    return matchesTitle && matchesLocation && matchesCategory;
  });

  return (
    <div>
      <div className="bg-[#005478] p-4 flex justify-center space-x-4 w-full">
        {/* Search by Job Title */}
        <input
          className="bg-transparent border-b border-white text-white placeholder-white focus:outline-none w-64"
          type="text"
          placeholder="Job title, skill or company"
          value={searchTitle}
          onChange={(e) => setSearchTitle(e.target.value)}
        />

        {/* Search by Location */}
        <input
          className="bg-transparent border-b border-white text-white placeholder-white focus:outline-none w-64"
          type="text"
          placeholder="Job Location"
          value={searchLocation}
          onChange={(e) => setSearchLocation(e.target.value)}
        />

        {/* Search by Category */}
        <input
          className="bg-transparent border-b border-white text-white placeholder-white focus:outline-none w-64"
          type="text"
          placeholder="Job Category"
          value={searchCategory}
          onChange={(e) => setSearchCategory(e.target.value)}
        />

        {/* Search Button (Optional) */}
        <button className="bg-[#69c3a1] text-white py-2 px-6 rounded-md font-bold flex items-center">
          <span className="mr-2">🔍</span> SEARCH
        </button>
      </div>

      {/* Job List */}
      <div className="bg-[#fffcfc] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 place-items-center py-10">
        {isLoading && <p>Loading jobs...</p>}
        {error && <p>Failed to fetch jobs.</p>}

        {/* Check if jobs are available */}
        {filteredJobs && filteredJobs.length > 0
          ? filteredJobs.map((job) => (
              <div
                key={job._id}
                className="bg-[#fffcfc] space-y-5 px-5 py-5 rounded-md shadow-md"
              >
                <h1 className="text-xl font-semibold">{job.title}</h1>
                <div className=" space-x-2 grid grid-cols-3">
                  <div className="flex space-x-2">
                    <div className="pt-1">
                      <FaMoneyBillWave />
                    </div>

                    <p className="flex">
                      <strong>Salary:</strong> R{job.salary}
                    </p>
                  </div>
                  <div className="flex space-x-1">
                    <div className="pt-1">
                      <FaFileAlt />
                    </div>

                    <p className="flex">
                      <strong>Type:</strong> {job.type}
                    </p>
                  </div>
                  <div className="flex space-x-1">
                    <div className="pt-1">
                      <FaLocationDot />
                    </div>

                    <p className="flex">
                      <strong>Location:</strong> {job.location}
                    </p>
                  </div>

                  {/* <p>
                    <strong>Type:</strong> {job.type}
                  </p>
                  <p>
                    <strong>Category:</strong> {job.category}
                  </p>
                  <p>
                    <strong>Experience:</strong> {job.exprience || "N/A"}
                  </p>
                  <p>
                    <strong>Location:</strong> {job.location}
                  </p>
                  <p>
                    <strong>Requirements:</strong> {job.requirements || "N/A"}
                  </p>
                  <p>
                    <strong>Description:</strong>{" "}
                    {job.desc || "No description available"}
                  </p> */}
                </div>

                <div className="flex justify-end">
                  <button
                    onClick={() => handleApply(job._id)}
                    disabled={applying === job._id}
                    className={` px-4 py-2 text-white rounded-md transition duration-300  ${
                      applying === job._id
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-blue-600 hover:bg-blue-700"
                    }`}
                  >
                    {applying === job._id ? "Applying..." : "Apply"}
                  </button>
                </div>
              </div>
            ))
          : !isLoading && <p>No jobs found.</p>}
      </div>
    </div>
  );
};

export default JobCard;
