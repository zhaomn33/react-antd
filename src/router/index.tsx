import {
  createBrowserRouter,
  useRoutes
} from "react-router-dom";
import Login from '@/modules/Login/index'
import Home from '@/modules/Home/index'
import Root from '@/router/root'
import ErrorPage from '@/error-page'
/* existing imports */
import Contact from "@/router/contact";

const Routes = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "contacts/:contactId",
        element: <Contact />,
      },
    ],
  },
]);

export default Routes