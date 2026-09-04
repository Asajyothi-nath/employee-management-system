import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

//import axios from "axios";
import axiosInstance from "../utils/axiosInstance"; // Adjust paths (../) depending on your folder layout


import { toast } from "react-toastify";


export default function Signup() {

  const [name, setName] = useState("");

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [role, setRole] = useState("employee");

  const [phone_number, setPhoneNumber] = useState("");

  const navigate = useNavigate();
  const handleSignup = async (e) => {

    e.preventDefault();

    try {

      const response = await axios.post(
        "https://onrender.com",
        {
          name,
          email,
          password,
          role, 
          phone_number
        }
      );


      console.log(response.data);

      toast.success("Signup Successful");

      navigate("/login");

    } catch (error) {

      console.log(error.message);
      toast.error(error.message);

    }
  };


  return (

    <div className="flex justify-center items-center min-h-screen bg-gray-100">

      <form onSubmit={handleSignup} className="bg-white p-8 rounded shadow-md w-96">

        <h1 className="text-3xl font-bold mb-6 text-center"> Signup  </h1>

        <input type="text" placeholder="Enter name" className="w-full border p-3 mb-4 rounded" onChange={(e) => setName(e.target.value) }/>

        <input type="email" placeholder="Enter email" className="w-full border p-3 mb-4 rounded" onChange={(e) => setEmail(e.target.value)}/>

        <input type="password" placeholder="Enter password" className="w-full border p-3 mb-4 rounded" onChange={(e) => setPassword(e.target.value) } />

        <select className="w-full border p-3 mb-4 rounded" value={role} onChange={(e) => setRole(e.target.value)}>

          <option value="employee">Employee</option>

          <option value="admin">Admin</option>

        </select>

        <input type="text" placeholder="Enter phone number" className="w-full border p-3 mb-4 rounded" value={phone_number} onChange={(e) => setPhoneNumber(e.target.value)}/>

        <button className="w-full bg-green-600 text-white p-3 rounded"> Signup </button>

        {/* LOGIN LINK */} 
        <p className="text-center mt-4 text-gray-600"> Already have an account?{" "} <button type="button" onClick={() => navigate("/login")} className="text-blue-600 font-semibold hover:underline" > Login </button> </p>

      </form>

    </div>
  );
}
