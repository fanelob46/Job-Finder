import { useLiveFeedJobsQuery } from "../Slices/jobApiSlice";


const JobCard = () => {

const { data, error, isLoading } = useLiveFeedJobsQuery();
console.log("Jobs:", data);

  return (
    <div>
      <div className="bg-[#f8f4f4] grid grid-cols-5 space-y-5 place-items-center py-10">
        {isLoading && <p>Loading jobs...</p>}
        {error && <p>Failed to fetch jobs.</p>}

        {data?.data && data.data.length > 0
          ? data.data.map((job) => (
              <div key={job._id} className="bg-slate-300 space-y-5 px-5 py-5">
                <h1>{job.title}</h1>
                <p>{job.type}</p>
                <p>{job.exprience}</p>
                <p>{job.location}</p>
                <p>{job.requirements}</p>
                <p>{job.desc}</p>
                <p>R{job.salary}</p>
              </div>
            ))
          : !isLoading && <p>No jobs found.</p>}
      </div>
    </div>
  );
}

export default JobCard