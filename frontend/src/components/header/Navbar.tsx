import { NavLink } from "react-router-dom";

export const Navbar = () => {
  return (
    <nav>
      <ul>
        <li>
          <NavLink to={"/"}>TrainCoin</NavLink>
        </li>
        <li>
          <NavLink to={"/transact"}>Transact</NavLink>
        </li>
        <li>
          <NavLink to={"/blockchain"}>Blockchain</NavLink>
        </li>
        <li>
          <NavLink to={"/login"}>Login</NavLink>
        </li>
      </ul>
    </nav>
  );
};
