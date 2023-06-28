import {
  createBrowserRouter,
  RouterProvider,
  Outlet
} from "react-router-dom";
import Navbar from "./component/navbar/Navbar";
import Footer from "./component/footer/Footer";
import Home from "./pages/home/Home";
import Singleblog from "./pages/singleblog/Singleblog";
import Write from "./pages/write/Write";
import Register from "./pages/register/Register";
import Login from "./pages/login/Login";
import '../src/app.css'

const Layout=()=>{
  
  return(
    <>
    <Navbar/>
    <Outlet/>
    <Footer/>
    </>
  )
}
const router = createBrowserRouter([
  {
    path: "/",
    element:<Layout/>,
    children:[
      {
        path:"/",
        element:<Home />
      },
      {
        path:"/write",
        element:<Write/>
      },
      {
        path:"/single/:id",
        element:<Singleblog/>
      }
    ]
  },
  {
    path:'/login',
    element:<Login/>
  },
  {
    path:"/register",
    element:<Register/>
  }
]);
const App = () => {

  return (
      <>
         <RouterProvider router={router} />
      </>
  )
}

export default App
