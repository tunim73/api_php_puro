import {
  AllNewsPage,
  HighlightedNews,
  MyProducts,
  NewsPage,
  SubscribersDashboard,
} from "pages/private";
import {
  CategoryṔage,
  ErrorPage,
  Home,
  Login,
  Product,
  Register,
} from "pages/public";
import { createBrowserRouter } from "react-router-dom";
import { BasicLayout } from "shared/Layouts";

export const Router = createBrowserRouter([
  {
    path: "/",
    element: <BasicLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      /* {
        path: "dashboard",
        element: <Register />,
      }, */
      {
        path: "category/:id",
        element: <CategoryṔage />,
      },
      {
        path: "meus-produtos",
        element: <MyProducts />,
      },
      {
        path: "produto/:id",
        element: <Product />,
      },
      {
        path: "noticias/destaques",
        element: <HighlightedNews />,
      },
      {
        path: "noticias",
        element: <AllNewsPage />,
      },
      {
        path: "noticia/:id",
        element: <NewsPage />,
      },
      {
        path: "admin/dashboard/assinantes",
        element: <SubscribersDashboard />,
      },
    ],
  },
]);
