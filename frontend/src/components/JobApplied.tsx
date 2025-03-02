import { useState, useEffect } from "react";
import { useGetUserApplicationsQuery } from "../Slices/userApiSlice"; // Import the query from your API slice
// import { JobCard } from "./JobCard"; // You can reuse the JobCard component for rendering

const JobApplied = () => {
  const { data, error, isLoading } = useGetUserApplicationsQuery();

  useEffect(() => {
    if (error) {
      alert("Failed to fetch applications");
    }
  }, [error]);

  return (
    <div className="py-10">
      <h2 className="text-2xl font-bold mb-5">Jobs You Have Applied For</h2>

      {isLoading && <p>Loading jobs...</p>}
      {error && <p>Failed to fetch applications.</p>}

      {data?.data && data.data.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {data.data.map((job) => (
            <div
              key={job._id}
              className="bg-slate-200 p-5 rounded-md shadow-md"
            >
              <h3 className="text-lg font-semibold">{job.title}</h3>
              <p>{job.location}</p>
              <p>{job.type}</p>
              <p>{job.salary}</p>
              <p>{job.requirements}</p>
              <p>{job.desc}</p>
              <p>{job.exprience}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No jobs found</p>
      )}
    </div>
  );
};

export default JobApplied;
