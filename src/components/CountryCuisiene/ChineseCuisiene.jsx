import React from "react";
import Cuisiene from "../Cuisiene";
import ChineseDishes from "../Dishes/ChineseDishes";

export default function ChineseCuisiene({ name }) {
  return (
    <>
      <Cuisiene name="Chinese" />
      <ChineseDishes />
    </>
  );
}
