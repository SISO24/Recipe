import { Link, NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { login } from "../store/authSlice";
import { Input } from "./index";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { Button } from "./index";
import authService from "../appwrite/auth";

function Signup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, seterror] = useState("");
  const { register, handleSubmit } = useForm();

  const create = async (data) => {
    seterror("");
    try {
      const userData = await authService.createAccount(data);
      if (userData) {
        const userData = await authService.getCurrentUser();
        if (userData) dispatch(login(userData));
        navigate("/");
      }
    } catch (error) {
      seterror(error.message);
    }
  };
  return (
    <div className="w-screen h-screen flex">
      <h1
        className="
    absolute
    top-4
    left-4
    text-6xl
    font-bold
    z-10
    bg-gradient-to-r
    from-orange-400
    via-orange-500
    to-yellow-400
    bg-clip-text
    text-transparent
  "
      >
        TasteHub
      </h1>

      <div className="w-[45%] h-screen bg-gradient-to-br from-slate-900 to-black flex justify-center items-center p-8">
        <div className="bg-white/95 backdrop-blur-sm w-[65%] h-[75%] rounded-3xl shadow-2xl border-0 flex flex-col justify-center py-8 px-6">
          <h1 className="text-black text-3xl font-bold text-center mb-14 tracking-tight">
            Signup
          </h1>
          {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
          <form onSubmit={handleSubmit(create)}>
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
                  className="w-[85%] mx-auto block h-12 pl-12 pr-4 rounded-xl border-2 border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all duration-200 text-center"
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
                Create Account
              </Button>
              <br />

              <NavLink
                to="/Login"
                className="text-center text-blue-600 hover:underline text-base"
              >
                Already a user? Login
              </NavLink>
            </div>
          </form>
        </div>
      </div>

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
    </div>
  );
}

export default Signup;
