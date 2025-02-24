
import { createBrowserRouter, RouterProvider } from "react-router-dom"

import MainLayout from "./layouts/MainLayout"
import HoriSearch from "./components/HoriSearch"
import VertiSearch from "./components/VertiSearch"
import JobCard from "./components/JobCard"
import JobsLayout from "./layouts/JobsLayout"
import ProfileSidebar from "./components/ProfileSidebar"
import ProfileLayout from "./layouts/ProfileLayout"
import PersonalInfo from "./components/PersonaInfo"
import JobApplied from "./components/JobApplied"
import SingUp from "./components/SingUp"
import LogInForm from "./components/LogInForm"
import EditProfile from "./components/EditProfile"
import AddJob from "./components/AddJob"
import AdminLayout from "./layouts/AdminLayout"
import AdminSideBar from "./components/AdminSideBar"


function App() {

  const router = createBrowserRouter([
    {path : "/",
      element: <MainLayout/>,
      children: [
        { index: true, element: <HoriSearch/>},
        { path: "/signUp", element: <SingUp/>},
        { path: "/login", element: <LogInForm/>}
      ]
    },
    {
      path: "/jobs",
      element: <MainLayout/>,
      children: [
        { index: true, element: <JobsLayout/> },
        
        
      ]
    },
    {
      path: "/profile",
      element: <ProfileLayout/>,
      children: [
        { path: "info", element: <PersonalInfo/>},
        {path: "applied-jobs", element: <JobApplied/>},
        {path: "update", element: <EditProfile/>}
      ]
    },
    {
      path:"/admin", element:<AdminLayout/>,
      children: [
        { path: "dashboard", element: <AdminSideBar/>},
        { path: "addJob", element: <AddJob/>}
      ]
    }
  ])

  return (
    <>
     
     <RouterProvider router={router}/>
    </>
  )
}

export default App
