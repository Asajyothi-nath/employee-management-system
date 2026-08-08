import { useState,useEffect } from "react";
import axiosInstance from "../utils/axiosInstance";

export default function EmployeeDashboard() {
  const [userdata,setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

useEffect(() => {
  const userDetails = async() => {
    try{
      const token = localStorage.getItem("token");
      const details = await axiosInstance.get("/user/profile",
        {
          headers: {

            Authorization: `Bearer ${token}`
          }
        }
      );
      setUserData(details.data.userDetails);
        
    }catch(error){
      console.log(error);
    } finally {
      setLoading(false);
    }
  }
  userDetails();
},[]);

if (loading) {
  return (
    <div className="flex justify-center items-center min-h-screen">
      Loading...
    </div>
  );
}

  return (

    <div className="min-h-screen bg-gray-100 p-6">
      <div className="mb-6">

      <h1 className="text-3xl font-bold text-gray-800">Employee Dashboard</h1>
      <p className="text-gray-500 mt-1">
        View your profile information
      </p>
      </div>
      <div className="bg-white rounded-xl shadow-md p-6">

        <h2 className="text-xl font-semibold text-gray-800 mb-6">Welcome, {userdata?.name} </h2>
        {
          userdata && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-500">Name</p>
                <p className="font-medium">{userdata.name}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-500">Email</p>
                <p className="font-medium">{userdata.email}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-500">Role</p>
                <p className="font-medium">{userdata.role}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-500">Phone</p>
                <p className="font-medium">{userdata.phone_number}</p>
              </div>
            </div>
          )
        }

      </div>
    </div>
  );
}