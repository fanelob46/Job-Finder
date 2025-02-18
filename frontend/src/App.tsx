
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


function App() {

  const router = createBrowserRouter([
    {path : "/",
      element: <MainLayout/>,
      children: [
        { index: true, element: <HoriSearch/>}
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
        {path: "applied-jobs", element: <JobApplied/>}
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
