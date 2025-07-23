import React, { useState } from "react";
import { useCallback } from "react";
import { Button, Input, RTE, Select } from "./index";
import appwriteService from "../appwrite/config";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { useEffect } from "react";
import { useForm } from "react-hook-form";

export default function PostForm({ post }) {
  const [error, seterror] = useState();
  const [loading, setLoading] = useState(true);

  const { register, handleSubmit, watch, setValue, control, getValues, reset } =
    useForm({
      defaultValues: {
        title: post?.title || "",
        slug: post?.$id || "",
        content: post?.content || "",
        ingredients: post?.ingredients || "",
        status: post?.status || "active",
      },
    });
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);

  const submit = async (data) => {
    try {
      console.log("userData=", userData);
      console.log("function called", data);
      if (!userData) {
        seterror("You must be logged in to create or update a post.");
        return;
      }
      if (post) {
        const file = data.image[0]
          ? await appwriteService.uploadFile(data.image[0])
          : null;
        if (file) {
          appwriteService.deleteFile(post.featuredImg);
        }
        const dbPost = await appwriteService.updatePost(post.$id, {
          ...data,
          featuredImg: file ? file.$id : undefined,
        });
        if (dbPost) {
          navigate(`/post/${dbPost.$id}`);
        }
      } else {
        const file = await appwriteService.uploadFile(data.image[0]);

        if (file) {
          const fileId = file.$id;
          data.featuredImg = fileId;
          const dbPost = await appwriteService.createPost({
            ...data,
            userId: userData.$id,
          });

          if (dbPost) {
            navigate(`/post/${dbPost.$id}`);
          }
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string")
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, "-")
        .replace(/\s/g, "-");

    return "";
  }, []);

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title), { shouldValidate: true });
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, slugTransform, setValue]);

  useEffect(() => {
    if (post) {
      reset({
        title: post.title,
        slug: post.$id, // or post.slug
        content: post.content,
        ingredients: post.ingredients || "",
        status: post.status || "active",
      });
    }
    setLoading(false);
  }, [post, reset]);

  if (loading) {
    return (
      <div className="w-screen h-screen flex items-center justify-center bg-gradient-to-br from-blue-400 via-blue-500 to-cyan-400">
        <div className="text-white text-2xl">Loading posts...</div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(submit)}
      className="w-full h-screen flex justify-center items-center bg-blue-100"
    >
      <div className="flex bg-white rounded-lg shadow-lg overflow-hidden w-[85%] max-w-7xl">
        <div className="w-2/3 p-6">
          <Input
            label="Title: "
            placeholder="Title"
            className="mb-4"
            {...register("title", { required: true })}
          />
          <Input
            label=""
            placeholder="Slug"
            className="mb-4 "
            {...register("slug", { required: true })}
            hidden
          />
          <Input
            label="Ingredients: "
            placeholder="e.g., Sugar, Milk, Cardamom"
            className="mb-4 w-[45%]"
            {...register("ingredients")}
            defaultValue={post?.ingredients || ""}
          />

          <RTE
            label="Content:"
            name="content"
            control={control}
            defaultValue={getValues("content")}
          />
        </div>

        <div className="w-1/3 p-6">
          <Input
            label="Featured Image"
            type="file"
            className="mb-4 bg-white border-4 border-black"
            accept="image/jpg , image/png ,image/gif "
            {...register("image", { required: post })}
          />

          {post && (
            <div className="w-full mb-4">
              <img
                src={appwriteService.getFileView(post.featuredImg)}
                alt={post.title}
                className="rounded-lg"
              />
            </div>
          )}
          <Select
            options={["active", "inactive"]}
            label="Status"
            className="mb-4"
            {...register("status", { required: true })}
            hidden
          />
          <Button
            type="submit"
            bgColor={post ? " bg-green-500 " : undefined}
            className="w-full"
          >
            {post ? "Update" : "Submit"}
          </Button>
        </div>
      </div>
    </form>
  );
}
