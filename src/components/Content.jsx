import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import appwriteService from "../appwrite/config";
import { Query } from "appwrite";
import conf from "../confg/conf";

export default function Content() {
  const { dishId } = useParams();
  const [searchParam] = useSearchParams();
  const query = searchParam.get("query");
  const [loading, setLoading] = useState(true);
  const [ingredients, setingredients] = useState([]);
  const [instruction, setinstruction] = useState([]);
  const API_key = "1e550b9eac02410da70e970fbf64a294";

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const searchRecipe = await axios.get(
          `https://api.spoonacular.com/recipes/complexSearch`,
          {
            params: {
              query: query,
              number: 1,
              apiKey: API_key,
            },
          }
        );
        const recipeId = searchRecipe.data.results[0]?.id;
        if (!recipeId) {
          try {
            const fallback = await appwriteService.databases.listDocuments(
              conf.appwriteDatabaseId,
              conf.appwriteCollectionId,
              [Query.equal("title", query)]
            );
            if (fallback.documents.length > 0) {
              const customRecipe = fallback.documents[0];
              const content = customRecipe.content;
              const ingredients = customRecipe.ingredients;
              setinstruction(
                typeof content === "string"
                  ? [content]
                  : content || ["not available"]
              );
              setingredients(
                typeof ingredients === "string"
                  ? [ingredients]
                  : ingredients || ["not available"]
              );
            } else {
              setinstruction("Recipe not found");
            }
          } catch (err) {
            console.log("error finding recipe", err);
          } finally {
            setLoading(false);
          }
          return;
        }

        const fullRecipe = await axios.get(
          `https://api.spoonacular.com/recipes/${recipeId}/information`,
          {
            params: {
              includeNutrition: false,
              apiKey: API_key,
            },
          }
        );
        console.log(fullRecipe);
        setingredients(fullRecipe.data.extendedIngredients || []);
        setinstruction(
          fullRecipe.data.analyzedInstructions[0]?.steps.map((s) => s.step) ||
            []
        );
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    fetchRecipe();
  }, [query, dishId]);
  {
  }

  if (loading) {
    return (
      <div className="w-screen h-screen flex items-center justify-center bg-gradient-to-br from-blue-400 via-blue-500 to-cyan-400">
        <div className="text-white text-2xl">Loading Recipe...</div>
      </div>
    );
  }

  return (
    <>
      <div className="w-full h-screen flex-col justify-between font-['Roboto']">
        <div
          className={`flex w-full h-[25%] bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 bg-cover bg-center bg-no-repeat justify-center items-center shadow-md rounded-b-3xl`}
        >
          <h1 className="text-5xl text-white font-bold p-4  drop-shadow-lg">
            Recipe For {query}
          </h1>
        </div>
        <div className="w-full h-full flex">
          <div className="bg-green-50 w-[50%] h-full pt-3 overflow-y-auto px-4 scrollbar-thin scrollbar-thumb-gray-400  shadow-lg">
            <h2 className="text-center font-semibold text-4xl text-gray-700 mb-4">
              🥗 Ingredients
            </h2>
            <div className="max-h-full">
              <ol className="text-center text-xl mt-2 flex flex-col gap-2 font-medium text-gray-700 leading-relaxed">
                {ingredients.map((ins, index) => (
                  <li key={index}>
                    🍅 {typeof ins === "string" ? ins : ins.original}
                  </li>
                ))}
              </ol>
            </div>
          </div>
          <div className="bg-orange-100 w-[50%] h-full pt-3 overflow-y-auto px-4 scrollbar-thin scrollbar-thumb-gray-400  shadow-lg">
            <h2 className="text-center font-semibold text-4xl text-gray-700 mb-4">
              👨‍🍳 Steps
            </h2>

            <div className="max-h-full">
              <ol className="text-center text-xl mt-2 flex flex-col gap-2 font-medium text-gray-700 leading-relaxed">
                {Array.isArray(instruction) ? (
                  instruction.map((step, index) => (
                    <li
                      key={index}
                      className="before:content-['✅'] before:mr-2 before:text-green-500 list-inside list-decimal text-gray-800"
                      dangerouslySetInnerHTML={{ __html: step }}
                    ></li>
                  ))
                ) : (
                  <li className="before:content-['✅'] before:mr-2 before:text-green-500 list-inside list-decimal text-gray-800">
                    {instruction || "No instructions available"}
                  </li>
                )}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
