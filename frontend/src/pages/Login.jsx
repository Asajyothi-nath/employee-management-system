import { useState } from "react";

import { toast } from "react-toastify";

//import axios from "axios";

import axiosInstance from "../utils/axiosInstance";

import { Navigate, useNavigate, Link } from "react-router-dom";

export default function Login() {

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const navigate = useNavigate();


  const token = localStorage.getItem("token");

  const user = JSON.parse(localStorage.getItem("user"));

  if(token){

      if(user?.role === "admin"){

          return (
            <Navigate to="/admin/home" />
          );
      }

      return (
        <Navigate to="/employee/dashboard" />
      );
  }

  const handleLogin = async (e) => {

    e.preventDefault();

    try {

      const response = await axiosInstance.post(

        "http://localhost:8000/api/auth/login",

        {
          email,
          password
        }
      );
      console.log("AfterLogin",response.data.user);
      toast.success("Login Successful");
      localStorage.setItem("token", response.data.accessToken);
      localStorage.setItem("refreshToken", response.data.refreshToken);
      localStorage.setItem("role",response.data.user.role);
      //localStorage will store only value ,but here user data is an object so we have to store that by using JSON.stringify
      localStorage.setItem("user",JSON.stringify(response.data.user));
      if(response.data.user.role === "admin"){
        navigate("/admin/home",{
          replace:true
        });
      }else{
        navigate("/employee/dashboard",{
          replace:true
        });
      }
      

    } catch (error) {
        console.log(error.message);
        toast.error(error.message);
    }
  };


  return (

    <div className="flex justify-center items-center min-h-screen bg-gray-100">

      <form onSubmit={handleLogin} className="bg-white p-8 rounded shadow-md w-96">

        <h1 className="text-3xl font-bold mb-6 text-center">Login</h1>

        <input type="email" placeholder="Enter email" className="w-full border p-3 mb-4 rounded" onChange={(e) => setEmail(e.target.value) }/>

        <input type="password" placeholder="Enter password" className="w-full border p-3 mb-4 rounded" onChange={(e) => setPassword(e.target.value) }/>

        <div className="text-right mb-3">
          <Link to="/forgot-password" className="text-blue-600">Forgot Password?</Link>
        </div>
        <button className="w-full bg-green-600 text-white p-3 rounded"> Login </button>

      </form>

    </div>
  );
}