import { useRoutes } from "react-router-dom"
import { pathDefault } from "./common/path";
import SignIn from './pages/signIn/SignIn';
import { Bounce, toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React, { createContext, Suspense } from "react";
import AdminTemplate from "./templates/AdminTemplate/AdminTemplate";
import ManagerDetailJob from "./pages/ManagerDetailJob/ManagerDetailJob";
import DetailJob from "./templates/HomeTemplate/components/DetailJob";
import DetailJobId from "./templates/HomeTemplate/components/DetailJobId";


export const NotificationContext = createContext()

const HomeTemplate = React.lazy(() =>
  import("./templates/HomeTemplate/HomeTemplate")
);
const ManagerJob = React.lazy(() => import("./pages/ManagerJob/ManagerJob"));
const ManagerComment = React.lazy(() =>
  import("./pages/ManagerComment/ManagerComment")
);
const ManagerUser = React.lazy(() => import("./pages/ManagerUser/ManagerUser"));
 const arrRoutes = [
   {
     path: pathDefault.homePage,
     element: <HomeTemplate />,
   },
   {
     path: "detail/:slug",
     element: <DetailJob />,
   },
   {
     path: "detail/:slug/:id",
     element: <DetailJobId />,
   },
   {
     path: pathDefault.signIn,
     element: <SignIn />,
   },
   {
     path: pathDefault.admin,
     element: <AdminTemplate />,
     children: [
       {
         index: true,
         element: <ManagerUser />,
       },
       {
         path: "manager-user",
         element: (
           <Suspense fallback={<div>Vui lòng chờ 1 chút</div>}>
             <ManagerUser />
           </Suspense>
         ),
       },
       {
         path: "manager-job",
         element: (
           <Suspense fallback={<div>Vui lòng chờ 1 chút</div>}>
             <ManagerJob />
           </Suspense>
         ),
       },
       {
         path: "manager-job/manager-detail-job/:id",
         element: <ManagerDetailJob />,
       },
       {
         path: "manager-comment",
         element: (
           <Suspense fallback={<div>Vui lòng chờ 1 chút</div>}>
             <ManagerComment />
           </Suspense>
         ),
       },
     ],
   },
 ];
function App() {
  const routes  = useRoutes(arrRoutes)
  const handleNotification = (type,content,timeClose = 3000) =>{
    toast[type](content, {
      position: "top-right",
      autoClose: timeClose,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });
    // toast.error || toast.success || toast.warning || toast.info
  }

  return (
    <>
      <NotificationContext.Provider value={handleNotification}>
        {routes}
        <ToastContainer />
      </NotificationContext.Provider>
    </>
  );
}

export default App
