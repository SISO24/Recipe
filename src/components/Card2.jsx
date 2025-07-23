import React from "react";
import { NavLink } from "react-router-dom";

export default function Card2({ Cataegory, src }) {
  return (
    <div className="relative w-80 h-46 m-4 rounded-3xl overflow-hidden shadow-lg ">
      <div className="relative z-10 h-full flex justify-center items-center">
        <NavLink to={`/Content/${Cataegory}?query=${Cataegory}`}>
          <h2 className="text-white text-4xl font-bold text-center ">
            {Cataegory}
          </h2>
        </NavLink>
      </div>
      <div
        className="absolute inset-0 bg-cover bg-center opacity-50 border-6"
        style={{ backgroundImage: `url('${src}')` }}
      ></div>
    </div>
  );
}
