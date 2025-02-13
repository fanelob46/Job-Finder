const HoriSearch = () => {
  return (
    <div className="py-32 flex justify-center  ">
      <div className="bg-slate-300 p-8 rounded-lg shadow-lg w-96">
        <form className="flex flex-col space-y-5">
          <h1 className="text-xl font-semibold text-gray-900 text-center">
            Search for Jobs
          </h1>

          
          <div className="flex items-center border border-gray-300 rounded-md p-2 bg-white shadow-sm">
            <input
              className="appearance-none bg-transparent border-none text-gray-700 leading-tight focus:outline-none w-full"
              type="text"
              placeholder="Job Title"
              aria-label="Full name"
            />
          </div>

          
          <select className="block py-2.5 px-3 w-full text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-400">
            <option selected>Location</option>
            <option value="GA">Gauteng</option>
            <option value="WC">Western Cape</option>
            <option value="MP">Mpumalanga</option>
            <option value="FS">Free State</option>
          </select>

          
          <select className="block py-2.5 px-3 w-full text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-400">
            <option selected>Category</option>
            <option value="Mn">Mining</option>
            <option value="It">Information Technology</option>
            <option value="Fc">Finance</option>
            <option value="Hs">Health</option>
          </select>

          
          <button className="bg-gray-900 text-white py-2 rounded-md hover:bg-gray-700 transition">
            Search Jobs
          </button>
        </form>
      </div>
    </div>
  );
};

export default HoriSearch;
