import React, { useState, useEffect } from "react";
import { PostForm } from ".";
import appwriteService from "../appwrite/config";
import { useNavigate, useParams } from "react-router-dom";

export default function EditPost() {
  const [post, setpost] = useState(null);
  const { slug } = useParams();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (slug) {
      appwriteService.getPost(slug).then((post) => {
        if (post) {
          setpost(post);
        }
        setLoading(false);
      });
    } else {
      navigate("/");
    }
    setLoading(false);
  }, [slug, navigate]);

  if (loading) {
    return (
      <div className="w-screen h-screen flex items-center justify-center bg-gradient-to-br from-blue-400 via-blue-500 to-cyan-400">
        <div className="text-white text-2xl">Loading posts...</div>
      </div>
    );
  }

  return post ? (
    <div className="">
      <PostForm post={post} />
    </div>
  ) : null;
}
