import React from "react";
import { Outlet } from "react-router-dom";
import Card2 from "../Card2";

export default function IndianDishes() {
  const Dishes = [
    "Rajma",
    "Baingan Bharta",
    "Paneer",
    "Aloo paratha",
    "Masala Dosa",
    "Poha",
  ];

  return (
    <>
      <div className="flex flex-wrap w-full h-screen justify-center items-center gap-6">
        {Dishes.map((dish, idx) => (
          <div
            key={idx}
            className="w-[30%] min-w-[250px] hover:scale-105 transition-transform duration-300"
          >
            <Card2 key={idx} Cataegory={dish} src={`/images/${dish}.jpg`} />
          </div>
        ))}
      </div>
      <Outlet />
    </>
  );
}
