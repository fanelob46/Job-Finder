import { Link } from "react-router-dom";

const AddJob = () => {
  return (
    <div className="py-20 px-20 bg-white grid place-items-center">
      <div className="pr-56">
        <h1>ADD JOB</h1>
        <hr className="w-[750px]" />
      </div>

      <form className="mt-8 space-y-4 border border-gray-400 px-10 py-10 bg-[#f8f4f4]">
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
            required
            className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
            placeholder="Enter job description"
            rows={4}
          ></textarea>
        </div>

        <div className="!mt-8">
          <button
            type="button"
            className="w-full py-3 px-4 text-sm tracking-wide rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
          >
            Add New Job
          </button>
        </div>
        <p className="text-gray-800 text-sm !mt-8 text-center">
          View all jobs?{" "}
          <Link
            to={"/jobs"}
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
