import { Outlet } from "react-router-dom";
import { Navbar } from "../components/header/Navbar";

export default function () {
  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
      <footer></footer>
    </>
  );
}
