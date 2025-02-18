import { Outlet } from "react-router-dom"
import NavBar from "../components/NavBar"
import ProfileSidebar from "../components/ProfileSidebar"


const ProfileLayout = () => {
  return (
    <>
      <header>
        <NavBar />
      </header>
      <main className="grid sm:grid-cols-[30%_60%] min-h-[40vh] py-10 gap-[5%] mt-10 justify-self-center w-[95%]  relative overflow-x-hidden">
        <ProfileSidebar />
        <Outlet />
      </main>
    </>
  );
}

export default ProfileLayout