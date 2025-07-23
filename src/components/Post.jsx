import React, { useState, useEffect } from "react";
import appwriteService from "../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Button from "./Button";
import parse from "html-react-parser";
import { Link } from "react-router-dom";

export default function Post() {
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);
  const { slug } = useParams();
  const [post, setpost] = useState(null);
  const [loading, setLoading] = useState(true);
  const isAuthor = post && userData ? post.userId === userData.$id : false;
  console.log("AUTHOR=", isAuthor);

  useEffect(() => {
    if (slug) {
      appwriteService.getPost(slug).then((post) => {
        if (post) setpost(post);
        else {
          navigate("/");
        }
        setLoading(false);
      });
    }
  }, [slug]);

  const deletePosts = () => {
    if (post)
      appwriteService.deletePost(post.$id).then((status) => {
        if (status) {
          appwriteService.deleteFile(post.featuredImg);
          navigate("/");
        }
        alert("deleted successfully");
      });
  };
  console.log("Logged-in user ID:", userData?.$id);
  console.log("Post's user ID:", post?.userId);
  console.log("AUTHOR =", isAuthor);

  if (loading) {
    return (
      <div className="w-screen h-screen flex items-center justify-center bg-gradient-to-br from-blue-400 via-blue-500 to-cyan-400">
        <div className="text-white text-2xl">Loading posts...</div>
      </div>
    );
  }

  return post ? (
    <div className=" w-screen h-screen bg-gray-200 flex ">
      <div className="w-[40%] bg-zinc-800  flex  flex-col gap-15 relative mt-0 p-6 h-screen  ">
        <img
          src={appwriteService.getFileView(post.featuredImg)}
          alt={post.title}
          className="w-[65%] h-[35%] m-2 p-2 mt-1  border-5 border-emerald-100 bg-amber-50 drop-shadow-amber-50 rounded-2xl"
        />
        <div className="w-[85%] h-[55%] bg-white rounded-3xl flex flex-col    overflow-y-scroll border-5 border-emerald-100">
          <h2 className="text-center font-bold text-4xl mt-4 ">Ingredients</h2>
          <br />

          <ul className="flex flex-col justify-center items-center">
            <li className="text-center text-2xl "> {post.ingredients}</li>
          </ul>
        </div>
      </div>
      <div className="flex flex-col w-[75%] h-full bg-gradient-to-br from-sky-100 to-emerald-100  items-center">
        {/* Dish Title Box */}
        <div className="w-[35%] h-24 flex rounded-2xl mb-6 mt-6 bg-white justify-center items-center">
          <h1 className="text-2xl font-bold text-center">
            Dish Name : {post.title}
          </h1>
        </div>

        {/* Dish Content Box */}
        <div className="bg-white overflow-y-scroll rounded-xl border border-zinc-300 p-16 w-3/4 h-[70%] flex  text-3xl text-gray-700 shadow-md">
          <h3 className="text-2xl font-medium  px-4">{parse(post.content)}</h3>
        </div>
        {isAuthor && (
          <div className="absolute right-6 top-18">
            <Link to={`/edit-post/${post.$id}`}>
              <Button bgColor="bg-red-500" className="mr-3 ">
                Edit
              </Button>
            </Link>

            <Button
              bgColor="bg-red-500 "
              className="mr-3"
              onClick={deletePosts}
            >
              Delete
            </Button>
          </div>
        )}
      </div>
    </div>
  ) : null;
}
