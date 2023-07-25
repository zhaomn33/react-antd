import {
  createBrowserRouter,
  useRoutes
} from "react-router-dom";
import Login from '@/modules/Login/index'
import Home from '@/modules/Home/index'
import ErrorPage from '@/error-page'
/* 👉 demo existing imports */
import Root, { loader as rootLoader, action as rootAction, } from '@/router/root'
import Contact, { loader as contactLoader, action as contactAction, } from "@/router/contact";
import EditContact, { action as editAction }  from "@/router/edit";
import { action as destroyAction } from "@/router/destroy";
import Index from "@/router/index";

const Routes = createBrowserRouter([
  // 👉 demo:
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: rootLoader,
    action: rootAction,
    children: [
      {
        // 👉 根据冒泡就近原则，再嵌套一层子路由，将errorElement属性统一放在根子路由上，此时错误页面会在根出口中呈现
        errorElement: <ErrorPage />,
        children: [
          { index: true, element: <Index /> },
          {
            path: "contacts/:contactId",
            element: <Contact />,
            loader: contactLoader,
            action: contactAction
          },
          {
            path: "contacts/:contactId/edit",
            element: <EditContact />,
            loader: contactLoader,
            action: editAction
          },
          {
            path: "contacts/:contactId/destroy",
            action: destroyAction,
            errorElement: <div>Oops! There was an error.</div>
          },
          // 👉 当操作抛出一个错误信息
          //   export async function action({ params }) {
          //     throw new Error("oh dang!");
          //   }
          // 👉 如果在子路由:
          //   未添加 errorElement 属性时，他会找到根路由的 errorElement
          //   添加有 errorElement 属性时，他会找到自己的 errorElement（冒泡就近原则）
        ],
      },
    ]
  }


  // {
  //   path: "/",
  //   element: <Login />,
  //   errorElement: <ErrorPage />,
  //   // children: [
  //   //   {
  //   //     path: "home",
  //   //     element: <Home />,
  //   //   },
  //   // ],
  // },
  // {
  //   path: "/home",
  //   element: <Home />,
  //   errorElement: <ErrorPage />
  // },
]);

export default Routes