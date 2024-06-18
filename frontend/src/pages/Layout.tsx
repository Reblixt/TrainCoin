import { Outlet } from "react-router-dom";
import { Navbar } from "../components/header/Navbar";

export default function () {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <main>
        <Outlet />
      </main>
      <footer></footer>
    </>
  );
}
