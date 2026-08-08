import { useEffect, useState } from "react";

import axiosInstance from "../utils/axiosInstance";

import {BarChart,Bar,XAxis,YAxis,CartesianGrid,Tooltip,ResponsiveContainer} from "recharts";

export default function AdminHome(){

    const[stats, setStats] = useState({
        totalUsers:0,
        totalAdmins:0,
        totalEmployees:0
    });

  const chartData = [
    {
        name:"Admins",
        count:stats.totalAdmins
    },
    {
        name:"Employees",
        count:stats.totalEmployees
    }
  ];

    useEffect(() => {

        fetchDashboardStats();

    },[]);

    const fetchDashboardStats = async() => {

        try {
            const token = localStorage.getItem("token");

            const response = await axiosInstance.get("admin/dashboard-stats",
                {
                    headers:{
                        Authorization:`Bearer ${token}`
                    }
                }
            );

            setStats(response.data);

        } catch(error){

            console.log(error);
        }
    };

    return(
    <div>
        {/* Dashboard Cards */}
        <div className="grid grid-cols-3 gap-4 mb-6">

                <div className="bg-blue-500 text-white p-4 rounded">

                    <h2 className="text-xl font-bold">Total Users</h2>

                    <p className="text-3xl">{stats.totalUsers}</p>

                </div>

                <div className="bg-green-500 text-white p-4 rounded">

                    <h2 className="text-xl font-bold">Admins</h2>

                    <p className="text-3xl">{stats.totalAdmins}</p>

                </div>

                <div className="bg-purple-500 text-white p-4 rounded">

                    <h2 className="text-xl font-bold">Employees</h2>

                    <p className="text-3xl">{stats.totalEmployees}</p>

                </div>

            </div>

            {/* Chart Section */}

            <div className="bg-white p-6 rounded shadow mb-6">

            <h2 className="text-2xl font-bold mb-4">User Analytics</h2>

            <ResponsiveContainer width="100%" height={300}>

                <BarChart data={chartData}>

                <CartesianGrid strokeDasharray="3 3" />

                <XAxis dataKey="name" />

                <YAxis />

                <Tooltip />

                <Bar dataKey="count" fill="#8884d8" />

                </BarChart>

            </ResponsiveContainer>

        </div>
    </div>


    );
    
}