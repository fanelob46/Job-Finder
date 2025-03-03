import { useState } from "react";
import {
  useGetAllJobsQuery,
  useDeleteJobMutation,
} from "../Slices/jobApiSlice";
import { FaRegEdit } from "react-icons/fa";
import { FaRegTrashCan } from "react-icons/fa6";
import EditJobModal from "../components/EditJob";
import { Job } from "../definitions";

const JobsPage = () => {
  const { data, error, isLoading } = useGetAllJobsQuery();
  const [deleteJob] = useDeleteJobMutation();
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEdit = (job: Job) => {
    setSelectedJob(job);
    setIsModalOpen(true);
  };

  const handleDelete = async (jobId: string) => {
    if (confirm("Are you sure you want to delete this job?")) {
      try {
        await deleteJob(jobId).unwrap();
        alert("Job deleted successfully!");
      } catch (err) {
        console.error("Failed to delete job:", err);
        alert("Error deleting job.");
      }
    }
  };

  const handleSave = (updatedJob: Job) => {
    // Optionally, you can update the local state or refetch the jobs
    alert("Job updated successfully!");
  };

  return (
    <div>
      <div className="bg-[#f8f4f4] grid grid-cols-3 gap-5 place-items-center py-10">
        {isLoading && <p>Loading jobs...</p>}
        {error && <p>Failed to fetch jobs.</p>}

        {data?.data && data.data.length > 0
          ? data.data.map((job) => (
              <div
                key={job._id}
                className="bg-slate-300 rounded-lg shadow-md p-5 w-80 space-y-3"
              >
                <h1 className="text-lg font-semibold">{job.title}</h1>
                <p className="text-sm text-gray-600">{job.type}</p>
                <p className="text-sm">Exprience: {job.exprience}</p>
                <p className="text-sm">Location: {job.location}</p>
                <p className="text-sm">Category: {job.category}</p>

                <p className="text-sm">Requirements: {job.requirements}</p>
                <p className="text-sm">Description: {job.desc}</p>
                <p className="text-sm font-bold">Salary: R{job.salary}</p>

                <div className="flex justify-between items-center mt-3">
                  <button
                    onClick={() => handleEdit(job)}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    <FaRegEdit size={20} />
                  </button>
                  <button
                    onClick={() => handleDelete(job._id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <FaRegTrashCan size={20} />
                  </button>
                </div>
              </div>
            ))
          : !isLoading && <p>No jobs found.</p>}
      </div>

      {selectedJob && (
        <EditJobModal
          job={selectedJob}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

export default JobsPage;
