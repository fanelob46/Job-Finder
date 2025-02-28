
import { useGetAllJobsQuery } from "../Slices/jobApiSlice";


const JobsPage = () => {
  const { data, error, isLoading } = useGetAllJobsQuery();
  
  
  console.log("Jobs:", data);

  return (
    <div>
      <div className="bg-[#f8f4f4] grid place-items-center py-10">
        {isLoading && <p>Loading jobs...</p>}
        {error && <p>Failed to fetch jobs.</p>}

        {data?.data && data.data.length > 0
          ? data.data.map(
              job => (
                <div key={job._id} className="bg-slate-300 space-y-5 px-5 py-5">
                  <h1>{job.title}</h1>
                  <p>{job.contact}</p>
                  <p>{job.type}</p>
                  <p>{job.location}</p>
                  <p>R{job.salary}</p>
                </div>
              )
            )
          : !isLoading && <p>No jobs found.</p>}
      </div>
    </div>
  );
};

export default JobsPage;
