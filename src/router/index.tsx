import {
  createBrowserRouter,
  Navigate
} from "react-router";
import { lazy } from "react";
import RootLayout from "@/components/layout/RootLayout";
import SuspenseWrapper from "@/components/layout/Wrapper/SuspenseWrapper";

const HomePage = lazy(() => import("@/pages/HomePage/HomePage"));
const CategoryPage = lazy(() => import("@/pages/CategoryPage/CategoryPage"));

export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: (
          <SuspenseWrapper>
            <HomePage />
          </SuspenseWrapper>
        ),
      },
      {
        path: "/commands/:category",
        element: (
          <SuspenseWrapper>
            <CategoryPage />
          </SuspenseWrapper>
        ),
      },
      {
        path: "*",
        element: <Navigate to='/' replace />,
      },
    ],
  },
]);
