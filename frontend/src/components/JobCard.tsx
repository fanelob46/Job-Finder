import { useState } from "react";
import { useLiveFeedJobsQuery } from "../Slices/jobApiSlice";
import { useApplyForJobMutation } from "../Slices/userApiSlice";

const JobCard = () => {
  const { data, error, isLoading } = useLiveFeedJobsQuery();
  const [applyForJob] = useApplyForJobMutation();
  const [applying, setApplying] = useState<string | null>(null);
  console.log("Jobs:", data);

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

  return (
    <div>
      <div className="bg-[#f8f4f4] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 place-items-center py-10">
        {isLoading && <p>Loading jobs...</p>}
        {error && <p>Failed to fetch jobs.</p>}

        {/* Check if jobs are available */}
        {data?.data && data.data.length > 0
          ? data.data.map((job) => (
              <div
                key={job._id}
                className="bg-slate-300 space-y-5 px-5 py-5 rounded-md shadow-md"
              >
                <h1 className="text-xl font-semibold">{job.title}</h1>
                <p>
                  <strong>Type:</strong> {job.type}
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
                </p>
                <p>
                  <strong>Salary:</strong> R{job.salary}
                </p>

                <button
                  onClick={() => handleApply(job._id)}
                  disabled={applying === job._id}
                  className={`w-full px-4 py-2 text-white rounded-md transition duration-300 ${
                    applying === job._id
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-blue-600 hover:bg-blue-700"
                  }`}
                >
                  {applying === job._id ? "Applying..." : "Apply"}
                </button>
              </div>
            ))
          : !isLoading && <p>No jobs found.</p>}
      </div>
    </div>
  );
};

export default JobCard;
