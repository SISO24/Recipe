import { NavLink } from "react-router-dom";
import { Input, Button } from "./index";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { login as authLogin } from "../store/authSlice";
import authService from "../appwrite/auth";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [error, seterror] = useState();

  const login = async (data) => {
    seterror("");
    try {
      const session = await authService.login(data);
      if (session) {
        const userData = await authService.getCurrentUser();
        if (userData) dispatch(authLogin(userData));
        navigate("/");
      }
    } catch (error) {
      seterror(error.message);
    }
  };

  return (
    <div className="w-screen h-screen flex">
      <div className=" bg-orange-400 w-[55%] h-screen relative">
        <img
          src="/cover.jpg"
          className="w-full h-full opacity-60  object-cover"
        />
        *
        <div className="absolute top-0 left-0 p-10">
          <h1 className="text-white font-bold text-8xl leading-tight">
            Explore
            <br />
            Flavours
            <br />
            Express
            <br />
            Your
            <br />
            Creativity
          </h1>
        </div>
      </div>

      <div className="w-[45%] h-screen bg-gradient-to-br from-slate-900 to-black flex justify-center items-center p-8">
        <div className="bg-white/95 backdrop-blur-sm w-[65%] h-[75%] rounded-3xl shadow-2xl border-0 flex flex-col justify-center py-8 px-6">
          <h1 className="text-black text-3xl font-bold text-center mb-14 tracking-tight">
            Login
          </h1>
          {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
          <form onSubmit={handleSubmit(login)}>
            <div className="space-y-8 flex flex-col justify-center">
              <div className="relative">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="w-[85%] mx-auto block h-12 pl-12 pr-4 rounded-xl border-2 border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all duration-200 text-center"
                  {...register("email", {
                    required: true,
                  })}
                />
              </div>
              <br />

              <div className="relative">
                <Input
                  type="password"
                  placeholder="Enter your password"
                  className="w-[85%] mx-auto block  h-12 pl-12 pr-4 rounded-xl border-2 border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all duration-200 text-center"
                  {...register("password", {
                    required: true,
                  })}
                />
              </div>
              <br />
              <Button
                type="submit"
                className="mx-auto w-40 h-12 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
              >
                Login
              </Button>
              <br />

              <NavLink
                to="/Signup"
                className="text-center text-blue-600 hover:underline text-base"
              >
                New user? Signup
              </NavLink>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
