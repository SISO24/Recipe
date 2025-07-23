import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import appwriteService from "../appwrite/config";
import PostCard from "./PostCard";
import { useSelector } from "react-redux";
import { Query } from "appwrite";

export default function Posts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const userData = useSelector((state) => state.auth.userData);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserPosts = async () => {
      setLoading(true);
      // Check if userData exists and has an $id (meaning a user is logged in)
      if (userData && userData.$id) {
        try {
          const postsResponse = await appwriteService.getPosts([
            Query.equal("userId", userData.$id),
          ]);
          if (postsResponse) {
            setPosts(postsResponse.documents);
          } else {
            setPosts([]);
          }
        } catch (error) {
          console.error("Error fetching user posts:", error);
          setPosts([]);
        } finally {
          setLoading(false);
        }
      } else {
        setPosts([]);
        setLoading(false);
      }
    };

    fetchUserPosts();
  }, [userData]);

  if (loading) {
    return (
      <div className="w-screen h-screen flex items-center justify-center bg-gradient-to-br from-blue-400 via-blue-500 to-cyan-400">
        <div className="text-white text-2xl">Loading posts...</div>
      </div>
    );
  }

  return (
    <div className="w-screen min-h-screen bg-gradient-to-br from-blue-400 via-blue-500 to-cyan-400 flex flex-col gap-1.5">
      <div className="w-screen h-24 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 flex items-center px-4">
        <h1 className="text-5xl font-bold text-white">Your Recipes</h1>
      </div>
      {posts.length > 0 ? (
        <div className="flex flex-wrap gap-4 p-4 justify-center md:justify-start">
          {posts.map((post) => (
            <div
              key={post.$id}
              className="p-2 mt-6 w-[325px] h-[300px] bg-white bg-opacity-80 rounded-3xl border border-amber-50 flex flex-col overflow-hidden"
            >
              <PostCard {...post} />
            </div>
          ))}
          {/* Add Post Block at the end */}
          <div className="p-2 mt-6 w-[325px] h-[300px]">
            <div
              className="relative bg-gradient-to-r from-slate-900 via-slate-800 mt-[-7px] to-slate-900 bg-opacity-80 rounded-3xl border w-[105%] h-[105%] flex flex-col items-center justify-center cursor-pointer transition duration-300 ease-in-out hover:scale-105"
              onClick={() => navigate("/PostForm")}
            >
              <h2 className="text-2xl font-bold mt-2 text-white">Add Post</h2>
              <button className="mt-8 w-20 h-20 rounded-full border-2 border-black bg-amber-50 text-black text-4xl flex items-center justify-center hover:scale-110 transition">
                +
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className=" bg-gradient-to-r from-slate-900 via-slate-800 mt-[7px] ml-2 to-slate-900 bg-opacity-80 rounded-3xl border w-[20%] h-75 flex flex-col items-center  cursor-pointer transition duration-300 ease-in-out hover:scale-105">
          <h2 className="text-2xl font-bold mt-4 text-white">Add Posts</h2>
          <button
            className="mt-18 w-20 h-20 rounded-full border-2 border-black bg-amber-50 text-black text-4xl flex items-center justify-center hover:scale-110 transition"
            onClick={() => navigate("/PostForm")}
          >
            +
          </button>
        </div>
      )}
    </div>
  );
}
