import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "@layouts/MainLayout/MainLayout";
import { lazy, Suspense } from "react";
const Home = lazy(() => import("@pages/Home"));
const Categories = lazy(() => import("@pages/Categories"));
const Products = lazy(() => import("@pages/Products"));
const AboutUs = lazy(() => import("@pages/AboutUs"));
const Register = lazy(() => import("@pages/Register"));
const Login = lazy(() => import("@pages/Login"));
const Error = lazy(() => import("@pages/Error"));
const Cart = lazy(() => import("@pages/Cart"));
const WishList = lazy(() => import("@pages/WishList.tsx"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback="Loading please wait...">
            <Home />
          </Suspense>
        ),
      },
      {
        path: "/cart",
        element: (
          <Suspense fallback="Loading please wait...">
            <Cart />
          </Suspense>
        ),
      },
      {
        path: "categories",
        element: (
          <Suspense fallback="Loading please wait...">
            <Categories />
          </Suspense>
        ),
      },
      {
        path: "about-us",
        element: (
          <Suspense fallback="Loading please wait...">
            <AboutUs />
          </Suspense>
        ),
      },
      {
        path: "wishlist",
        element: (
          <Suspense fallback="Loading please wait...">
            <WishList />
          </Suspense>
        ),
      },
      {
        path: "categories/products/:prefix",
        element: (
          <Suspense fallback="Loading please wait...">
            <Products />
          </Suspense>
        ),
        loader: ({ params }) => {
          if (
            typeof params.prefix !== "string" ||
            !/^[a-z]+$/i.test(params.prefix)
          ) {
            throw new Response("Bad Request", {
              statusText: "Category not found",
              status: 400,
            });
          }
          return true;
        },
      },
      {
        path: "login",
        element: (
          <Suspense fallback="Loading please wait...">
            <Login />
          </Suspense>
        ),
      },
      {
        path: "register",
        element: (
          <Suspense fallback="Loading please wait...">
            <Register />
          </Suspense>
        ),
      },
    ],
  },
]);

function AppRouter() {
  return <RouterProvider router={router} />;
}

export default AppRouter;
