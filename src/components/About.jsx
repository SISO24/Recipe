import React from "react";
import Footer from "./Footer";

export default function About() {
  return (
    <div className="min-h-screen w-full flex flex-col bg-gray-50">
      {" "}
      {/* Changed background to a light gray */}
      <div className="w-full h-24 bg-black flex items-center justify-center shadow-md">
        {" "}
        {/* Added shadow for depth */}
        <h1 className="text-orange-600 text-5xl font-extrabold tracking-wide">
          {" "}
          {/* Darker orange, larger, bolder, spaced out */}
          About Us
        </h1>
      </div>
      <div className="flex-grow flex flex-col items-center justify-center p-8 bg-white my-8 mx-auto rounded-lg shadow-xl max-w-4xl">
        {" "}
        {/* White background for content, margin, padding, rounded corners, shadow, max-width */}
        <p className="text-xl text-gray-800 text-center leading-relaxed mb-4">
          {" "}
          {/* Larger text, darker gray, relaxed line height, bottom margin */}
          Welcome to our recipe haven! This website is your go-to destination
          for discovering and exploring a vast collection of your favorite
          recipes.
        </p>
        <p className="text-xl text-gray-800 text-center leading-relaxed">
          {" "}
          {/* Consistent styling for second paragraph */}
          But it's more than just a Browse platform; we empower our community to
          become creators too! You can easily share your own unique and
          customized recipes, connecting with fellow food enthusiasts and
          expanding our delicious database.
        </p>
      </div>
      <Footer />
    </div>
  );
}
