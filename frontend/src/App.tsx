import { createBrowserRouter, RouterProvider } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";
import HoriSearch from "./components/HoriSearch";
import VertiSearch from "./components/VertiSearch";
import JobCard from "./components/JobCard";
import JobsLayout from "./layouts/JobsLayout";
import ProfileSidebar from "./components/ProfileSidebar";
import ProfileLayout from "./layouts/ProfileLayout";
import PersonalInfo from "./components/PersonaInfo";
import JobApplied from "./components/JobApplied";
import SingUp from "./components/SingUp";
import LogInForm from "./components/LogInForm";
import EditProfile from "./components/EditProfile";
import AddJob from "./components/AddJob";
import AdminLayout from "./layouts/AdminLayout";
import AdminSideBar from "./components/AdminSideBar";
import LoginPage from "./components/LoginPage";
import { Provider } from "react-redux";
import store from "./store";
import AuthLayout from "./layouts/AuthLayout";
import Home from "./components/Home";
import JobsPage from "./pages/JobsPage";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "SignUp",
          element: <SingUp />,
        },
        {
          path: "login",
          element: <LoginPage />,
        },
        {
          path: "/jobs",
          element: <JobsLayout />,
          
        },
        {
          path: "/profile",
          element: <ProfileLayout />,
          children: [
            {
              path: "info",
              element: <PersonalInfo />,
            },
            {
              path:"edit",
              element: <EditProfile/>
            },
            {
              path: "applied-jobs",
              element: <JobApplied />,
            },
          ],
        },
        {
          path:"/admin",
          element:<AdminLayout/>,
          children:[
            {
               path: "addJob",
               element: <AddJob/>
            },
            {
              path: "alljobs",
              element: <JobsPage/>
            }
            
          ]
        }
      ],
    },
  ]);

  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}

export default App;
