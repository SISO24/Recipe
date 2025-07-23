import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

export default function PersonalizedIntro() {
  const userData = useSelector((state) => state.auth.status);
  const Call = (e) => {
    if (!userData) {
      e.preventDefault();
      alert("Signup/Login first");
    }
  };

  return (
    <div className="w-full h-40 mt-12 p-4 bg-gradient-to-b from-orange-100 to-orange-50">
      <h2 className="text-3xl mt-1 font-bold  font-serif text-orange-800 tracking-wide ">
        Want to add your own recipes?{" "}
      </h2>
      <br />
      <br />
      <NavLink to="/Posts" onClick={Call}>
        <h2 className="text-3xl mt-1 font-bold  font-serif text-orange-800 tracking-wide ">
          Click Here
        </h2>
      </NavLink>
    </div>
  );
}
