const VertiSearch = () => {
  return (
    <div className="bg-[#005478] p-4 flex justify-center space-x-4 w-full ">
      <input
        className="bg-transparent border-b border-white text-white placeholder-white focus:outline-none w-64"
        type="text"
        placeholder="Job title, skill or company"
      />
      <select className="bg-transparent border-b border-white text-white focus:outline-none w-40">
        <option className="text-black" selected>
          Gauteng
        </option>
        <option className="text-black" value="WC">
          Western Cape
        </option>
        <option className="text-black" value="MP">
          Mpumalanga
        </option>
        <option className="text-black" value="FS">
          Free State
        </option>
      </select>
      <select className="bg-transparent border-b border-white text-white focus:outline-none w-56">
        <option className="text-black" selected>
          Information Technology
        </option>
        <option className="text-black" value="Mn">
          Mining
        </option>
        <option className="text-black" value="Fc">
          Finance
        </option>
        <option className="text-black" value="Hs">
          Health
        </option>
      </select>
      <button className="bg-[#69c3a1] text-white py-2 px-6 rounded-md font-bold flex items-center">
        <span className="mr-2">🔍</span> SEARCH
      </button>
    </div>
  );
};

export default VertiSearch;
