import {
  createBrowserRouter,
  Navigate,
  Outlet,
  ScrollRestoration,
} from "react-router";
import { lazy, Suspense, type ReactNode } from "react";
import { Header } from "@/components/layout/Header/Header";
import { Footer } from "@/components/layout/Footer/Footer";

const HomePage = lazy(() => import("@/pages/HomePage/HomePage"));
const CategoryPage = lazy(() => import("@/pages/CategoryPage/CategoryPage"));

function RootLayout() {
  return (
    <div className='app-layout'>
      <Header />
      <main className='app-layout__main'>
        <Outlet />
      </main>
      <Footer />
      <ScrollRestoration />
    </div>
  );
}

function SuspenseWrapper({ children }: { children: ReactNode }) {
  return (
    <Suspense
      fallback={
        <div className='loading-skeleton'>
          <div className='loading-skeleton__pulse' />
        </div>
      }
    >
      {children}
    </Suspense>
  );
}

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
