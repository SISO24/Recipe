import { useState } from "react";
import Header from "./components/Header";
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import { useEffect } from "react";
import { setUserData } from "./store/authSlice";
import { logout } from "./store/authSlice";
import appwriteSerice from "./appwrite/config";
import { useDispatch } from "react-redux";
import "./App.css";
import Card from "./components/Card";
import IndianCuisiene from "./components/CountryCuisiene/IndianCuisiene";
import ChineseCuisiene from "./components/CountryCuisiene/ChineseCuisiene";
import ItalianCuisiene from "./components/CountryCuisiene/ItalianCuisiene";
import MexicanCuisiene from "./components/CountryCuisiene/MexicanCuisiene";
import EditPost from "./components/EditPost";
import Footer from "./components/Footer";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Post from "./components/Post";
import { Posts } from "./components";
import PersonalizedIntro from "./components/PersonalizationIntro";
import About from "./components/About";
import Contact from "./components/Contact";
import Content from "./components/Content";
import PostForm from "./components/PostForm";

function Home() {
  return (
    <>
      <Header />
      <div className="flex justify-evenly">
        <Card src="\public\Indian_food.jpg" title="Indian Cuisiene" />
        <Card
          src="\public\orijit-chatterjee-wEBg_pYtynw-unsplash.jpg"
          title="Chinese Cuisiene"
        />
        <Card src="\public\italian_food.jpg" title="Italian Cuisiene" />
        <Card src="\public\Mexican_food.jpg" title="Mexican Cuisiene" />
      </div>
      <PersonalizedIntro />
      <Footer />
    </>
  );
}

function AboutPage() {
  return (
    <>
      <About />
    </>
  );
}

function ContactPage() {
  return (
    <>
      <Contact />
      <Footer />
    </>
  );
}

function SignupPage() {
  return (
    <>
      <Signup />
    </>
  );
}
function LoginPage() {
  return (
    <>
      <Login />
    </>
  );
}

function PostsPage() {
  return (
    <>
      <Posts />
    </>
  );
}

function PostFormFunction() {
  return (
    <>
      <PostForm />
    </>
  );
}

function IndividualPost() {
  return (
    <>
      <Post />
    </>
  );
}
function Edit() {
  return (
    <>
      <EditPost />
    </>
  );
}

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    appwriteSerice.account
      .get()
      .then((user) => {
        dispatch(setUserData(user));
      })
      .catch(() => {
        dispatch(logout());
      });
  }, [dispatch]);

  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Home />
            </>
          }
        />
        <Route path="/Indian Cuisiene" element={<IndianCuisiene />} />

        {/* <Route path="/Indian Cuisiene/Content" element={<Content />} /> */}
        <Route path="/Content/:dishId" element={<Content />} />
        <Route path="/Chinese Cuisiene" element={<ChineseCuisiene />} />
        <Route path="/Italian Cuisiene" element={<ItalianCuisiene />} />
        <Route path="/Mexican Cuisiene" element={<MexicanCuisiene />} />

        <Route
          path="/Signup"
          element={
            <>
              <SignupPage />
            </>
          }
        />
        <Route
          path="/Login"
          element={
            <>
              <LoginPage />
            </>
          }
        />

        <Route
          path="/about"
          element={
            <>
              <AboutPage />
            </>
          }
        />

        <Route
          path="/Contact"
          element={
            <>
              <ContactPage />
            </>
          }
        />
        <Route
          path="/Posts"
          element={
            <>
              <PostsPage />
            </>
          }
        />

        <Route
          path="/PostForm"
          element={
            <>
              <PostFormFunction />
            </>
          }
        />
        <Route
          path="/post/:slug"
          element={
            <>
              <IndividualPost />
            </>
          }
        />
        <Route
          path="/edit-post/:slug"
          element={
            <>
              <Edit />
            </>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
