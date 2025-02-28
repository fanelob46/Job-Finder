import { FaUsers } from "react-icons/fa";
import { Link } from "react-router-dom";
import { IoAdd } from "react-icons/io5";
import { IoBriefcaseOutline } from "react-icons/io5";



const AdminSideBar = () => {
  return (
    <main className="flex justify-center py-10 bg-gray-100 min-h-screen">
      <div className="bg-white shadow-md w-64 rounded-lg overflow-hidden">
        <div className="space-y-5 p-7 h-[70vh] bg-[var(--primary-color)] text-lg mt-[2px] rounded-[30px] m-2">
          <a
            href="/admin/alljobs"
            className="hover:font-semibold flex items-center gap-5"
          >
            <IoBriefcaseOutline className="text-[var(--accent)] size-6" />
            <p>JOBS</p>
          </a>
          <Link
            to={"addJob"}
            className="hover:font-semibold flex items-center gap-5"
          >
            <IoAdd className="text-[var(--accent)] size-6" />
            <p> Add JOB</p>
          </Link>
        </div>
      </div>
    </main>
  );
}

export default AdminSideBar