import React from "react";
import { NavLink } from "react-router-dom";
export default function Card({ src, title }) {
  return (
    <div className="max-w-80 rounded overflow-hidden shadow-lg mt-5 p-5 transform transition duration-300 hover:scale-105 hover:shadow-2xl">
      <img
        className="w-100 h-75 rounded-2xl obj-cover"
        src={src}
        alt="Sunset in the mountains"
      />
      <div className="px-6 py-4 bg-amber-100 rounded-2xl">
        <div className="font-bold text-xl mb-2">
          <NavLink to={`/${title.trim().replace(/\s+/g, " ")}`}>
            {title}
          </NavLink>
        </div>
        <p className="text-gray-700 text-base">A delight to yout taste buds</p>
      </div>
    </div>
  );
}
