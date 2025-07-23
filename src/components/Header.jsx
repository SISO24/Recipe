import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import LogoutBtn from "./LogoutBtn";
export default function Header() {
  const navigate = useNavigate();
  const authStatus = useSelector((state) => state.auth.status);

  const navItems = [
    {
      name: "Home",
      slug: "/",
      active: true,
    },
    {
      name: "About",
      slug: "/About",
      active: true,
    },
    {
      name: "Contact",
      slug: "/Contact",
      active: true,
    },
    {
      name: "Signup",
      slug: "/Signup",
      active: !authStatus,
    },
    {
      name: "Login",
      slug: "/Login",
      active: !authStatus,
    },
  ];
  return (
    <div className="  w-full h-full">
      <div className="w-full h-20 bg-black text-amber-50 flex  justify-between  items-center gap-4">
        <h1 className=" text-amber-50 flex justify-start text-4xl m-2 p-2">
          {" "}
          TasteHub
        </h1>
        {/* <ul className="flex gap-14 m-8 p-8 justify-end">
          <li className="text-2xl">
            <NavLink to="/Home">Home</NavLink>
          </li>
          <li className="text-2xl">
            <NavLink to="/About">About Us </NavLink>
          </li>
          <li className="text-2xl">
            <NavLink to="/Contact">Contact </NavLink>
          </li>
          <li className="text-2xl">
            <NavLink to="/Signup">Signup </NavLink>
          </li>
          <li className="text-2xl">
            <NavLink to="/Login">Login </NavLink>
          </li>
        </ul> */}
        <ul className="flex gap-14 m-8 p-8 justify-end">
          {navItems.map((item) =>
            item.active ? (
              <li key={item.name}>
                <button
                  onClick={() => navigate(item.slug)}
                  className="inline-bock px-6 py-2 duration-200  rounded-full hover:bg-green-500"
                >
                  {item.name}
                </button>
              </li>
            ) : null
          )}
          {authStatus && (
            <li>
              <LogoutBtn />
            </li>
          )}
        </ul>
      </div>
      <div className="w-full h-40  bg-gradient-to-b from-orange-100 to-orange-50 py-16 px-6 flex justify-center items-center gap-2.5">
        <svg
          className="justify-center items-center text-orange-500"
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            stroke-width="2"
          />
          <path d="M2 12h20" stroke="currentColor" stroke-width="2" />
          <path
            d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"
            stroke="currentColor"
            stroke-width="2"
          />
        </svg>
        <h2 className="text-4xl mt-1 font-bold  font-serif text-orange-800 tracking-wide drop-shadow-md">
          Explore Global Cuisienes
        </h2>{" "}
        <svg
          className="justify-center items-center text-orange-500"
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            stroke-width="2"
          />
          <path d="M2 12h20" stroke="currentColor" stroke-width="2" />
          <path
            d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"
            stroke="currentColor"
            stroke-width="2"
          />
        </svg>
      </div>
    </div>
  );
}
