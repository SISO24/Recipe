import React, { useState } from "react";
import axios from "axios";
import { NavLink, useParams, useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Query } from "appwrite";
import conf from "../confg/conf";
export default function Cuisiene({ name }) {
  const API_key = "1e550b9eac02410da70e970fbf64a294";
  const [searchParam] = useSearchParams();

  const navigate = useNavigate();

  const query = searchParam.get("query");

  const [dishinput, setdishinput] = useState("");
  const [instruction, setinstruction] = useState("");

  const handleSubmit = () => {
    if (dishinput.trim()) {
      navigate(`/Content/${dishinput}?query=${encodeURIComponent(dishinput)}`);
    }
  };

  useEffect(() => {
    const FindingRecipe = async () => {
      const dishname = await axios.get(
        `https://api.spoonacular.com/recipes/complexSearch`,
        {
          params: {
            query: query,
            number: 1,
            apiKey: API_key,
          },
        }
      );
      const recipeId = dishname.data.results[0]?.id;

      if (!recipeId) {
        try {
          const fallback = await databases.listDocuments(
            conf.appwriteDatabaseId,
            conf.appwriteCollectionId,
            [Query.search("title", query)]
          );
          if (fallback.documents.length > 0) {
            const customRecipe = fallback.documents[0];
            const content = customRecipe.content;
            setinstruction(
              typeof content === "string"
                ? [content]
                : content || ["not available"]
            );
          } else {
            setinstruction("Recipe not found");
          }
        } catch (err) {
          console.log("error finding recipe", err);
        }
      }

      const FullRecipe = await axios.get(
        `https://api.spoonacular.com/${recipeId}/information`,
        {
          params: {
            includeNutrition: false,
            apiKey: API_key,
          },
        }
      );
      setinstruction(
        FullRecipe.data.analyzeInstruction[0]?.step.map((s) => s.step || [])
      );
    };
    if (query) {
      FindingRecipe();
    }
  }, [query]);

  return (
    <div
      className="relative w-full h-64 bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/public/bgforcuisiene.jpg')" }}
    >
      {/* Dark overlay over only the background */}
      <div className="absolute inset-0 bg-black opacity-40 z-0"></div>

      {/* Content on top of the darkened background */}
      <div className="relative z-10 flex flex-col justify-center items-center h-full text-white text-center px-4">
        <h1 className="text-4xl font-bold mb-8">Welcome to {name} Cuisine</h1>
        <div className="flex gap-4 items-center w-full max-w-2xl">
          <input
            type="text"
            className="flex-grow rounded-3xl h-12 px-4 bg-white text-black placeholder-gray-500 text-center"
            placeholder="Enter the dish you are craving for"
            value={dishinput}
            onChange={(e) => setdishinput(e.target.value)}
          />
          <button
            type="submit"
            className="w-12 h-12 rounded-full bg-white flex justify-center items-center"
            onClick={handleSubmit}
          >
            <img
              src="/public/search.png"
              className="w-6 h-6 object-contain"
              alt="search"
            />
          </button>
        </div>
      </div>
    </div>
  );
}
