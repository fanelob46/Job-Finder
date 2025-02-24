import { FaUsers } from "react-icons/fa";


const AdminSideBar = () => {
  return (
    <main className="col-span-2">
      <div className="space-y-1">
        <div className="space-y-5 p-7 h-[70vh] bg-[var(--primary-color)] text-lg mt-[2px] rounded-[30px] m-2">
          <a
            href="/admin"
            className="hover:font-semibold flex items-center gap-5"
          >
            <FaUsers className="text-[var(--accent)] size-6" />
            <p>Users</p>
          </a>
        </div>
       
      </div>
    </main>
  );
}

export default AdminSideBar