import {
  Outlet,
  ScrollRestoration,
} from "react-router";
import { Header } from "@/components/layout/Header/Header";
import { Footer } from "@/components/layout/Footer/Footer";

export default function RootLayout() {
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