import { Outlet } from "react-router-dom"
import NavBar from "../components/NavBar"
import ProfileSidebar from "../components/ProfileSidebar"


const ProfileLayout = () => {
  return (
    <>
    <header>
        <NavBar/>
        </header>
        <main>
            <ProfileSidebar/>
            <Outlet/>
        </main>
        </>
  )
}

export default ProfileLayout