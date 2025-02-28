import { Outlet } from "react-router-dom";
import AdminSideBar from "../components/AdminSideBar";
import NavBar from "../components/NavBar";



const AdminLayout = () => {
  return (
    <div className="grid grid-cols-16 h-screen">
      
      <AdminSideBar />
      <div
        className=" col-span-14 h-[90vh] 
      "
      >
        <Outlet />
      </div>
    </div>
  );
}

export default AdminLayout

