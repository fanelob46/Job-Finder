import { useState } from "react";
import { useCreateJobMutation } from "../Slices/jobApiSlice";
import { Link, useNavigate } from "react-router-dom";

const AddJob = () => {
  const [formData, setFormData] = useState({
    title: "",
    type: "",
    location: "",
    category: "",
    salary: "",
    vacancies: "",
    exprience:"",
    requirements:"",
    desc:"",
    
  });

  const naviagte = useNavigate();

  const [createJob, { isLoading, isError, isSuccess, error }] =
    useCreateJobMutation();

  // Handle Input Change
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle Form Submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await createJob(formData).unwrap();
      alert("Job successfully added!");
      setFormData({
        title: "",
        type: "",
        location: "",
        category: "",
        salary: "",
        vacancies: "",
        desc: "",
        requirements: "",
        exprience:"",
      });
    } catch (err) {
      console.error("Failed to add job:", err);
    }
    naviagte("/admin/alljobs");
  };

  return (
    <div className="py-20 px-20 bg-white grid place-items-center">
      <div className="pr-56">
        <h1 className="text-2xl font-bold">ADD JOB</h1>
        <hr className="w-[750px] my-2 border-gray-400" />
      </div>

      <form
        className="mt-8 space-y-4 border border-gray-400 px-10 py-10 bg-[#f8f4f4] rounded-lg shadow-md"
        onSubmit={handleSubmit}
      >
        {[
          {
            label: "Job Title",
            name: "title",
            type: "text",
            placeholder: "Enter job title",
          },
          {
            label: "Job Type",
            name: "type",
            type: "text",
            placeholder: "Enter job type",
          },
          {
            label: "Location",
            name: "location",
            type: "text",
            placeholder: "Enter job location",
          },
          {
            label: "Category",
            name: "category",
            type: "text",
            placeholder: "Enter job category",
          },
          {
            label: "Salary",
            name: "salary",
            type: "number",
            placeholder: "Enter salary",
          },
          {
            label: "Vacancies",
            name: "vacancies",
            type: "number",
            placeholder: "Enter number of vacancies",
          },
        ].map((field) => (
          <div key={field.name}>
            <label className="text-gray-800 text-sm mb-2 block">
              {field.label}
            </label>
            <input
              name={field.name}
              type={field.type}
              value={formData[field.name as keyof typeof formData]}
              onChange={handleChange}
              required
              className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
              placeholder={field.placeholder}
            />
          </div>
        ))}

        <div>
          <label className="text-gray-800 text-sm mb-2 block">
            Job Description
          </label>
          <textarea
            name="description"
            value={formData.desc} // Ensures controlled input
            onChange={handleChange} // Allows user input
            
            className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
            placeholder="Enter job description"
            rows={4}
          />
        </div>

        {isError && (
          <p className="text-red-600 text-sm">
            Error adding job. Please try again.
          </p>
        )}
        {isSuccess && (
          <p className="text-green-600 text-sm">Job added successfully!</p>
        )}

        <div className="!mt-8">
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 px-4 text-sm tracking-wide rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none disabled:bg-gray-400"
          >
            {isLoading ? "Adding Job..." : "Add New Job"}
          </button>
        </div>
        <p className="text-gray-800 text-sm !mt-8 text-center">
          View all jobs?{" "}
          <Link
            to="/jobs"
            className="text-blue-600 hover:underline ml-1 whitespace-nowrap font-semibold"
          >
            Click here
          </Link>
        </p>
      </form>
    </div>
  );
};

export default AddJob;
