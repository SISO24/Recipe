import React from "react";
import appwriteService from "../appwrite/config";
import { Link } from "react-router-dom";

export default function PostCard({ $id, title, featuredImg }) {
  console.log("featuredImg-", featuredImg);
  return (
    <Link to={`/post/${$id}`}>
      <div className="bg-white/100 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl hover:scale-105 transition-all duration-300 group">
        <div className="w-full">
          <img
            src={appwriteService.getFileView(featuredImg)}
            alt={title}
            className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
          />
        </div>
        <div className="p-4">
          <h2 className="text-xl font-bold text-gray-900 line-clamp-2">
            {title}
          </h2>
        </div>
      </div>
    </Link>
  );
}
