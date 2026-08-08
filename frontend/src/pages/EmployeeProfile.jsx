import { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import { toast } from "react-toastify";

export default function EmployeeProfile() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        setLoading(true);
        try {

            const token = localStorage.getItem("token");

            const res = await axiosInstance.get("/user/profile",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            
            setName(res.data.userDetails.name);
            setEmail(res.data.userDetails.email);
            setRole(res.data.userDetails.role);
            setPhoneNumber(res.data.userDetails.phone_number);

        } catch (error) {

            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const handleUpdate = async () => {

        try {

            const token =
                localStorage.getItem("token");

            await axiosInstance.put(
                "/user/profile",
                {
                    name,
                    phone_number: phoneNumber
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            toast.success(
                "Profile updated successfully"
            );

        } catch (error) {

            toast.error(
                "Update failed"
            );
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <p>Loading profile...</p>
            </div>
        );
    }
    return (

        <div className="min-h-screen bg-gray-100 py-10 px-4">

            <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md p-8">
                <h1 className="text-2xl font-bold mb-4">
                    My Profile
                </h1>

                <p className="text-gray-500 mb-6">
                    View and update your profile information
                </p>

            <div><label className="block text-sm font-medium text-gray-700 mb-1">Name</label><input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-500"/></div>

            <div><label className="block text-sm font-medium text-gray-700 mb-1">Email</label><input type="email" value={email} disabled className="w-full bg-gray-100 border border-gray-300 rounded-lg p-3 cursor-not-allowed"/></div>

            <div><label className="block text-sm font-medium text-gray-700 mb-1">Role</label><input type="text" value={role} disabled className="w-full bg-gray-100 border border-gray-300 rounded-lg p-3 cursor-not-allowed" /></div>

            <div><label className="block text-sm font-medium text-gray-700 mb-1">Phone number</label><input type="text" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value) } className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-500" /></div>

            <button onClick={handleUpdate} className="mt-6 bg-green-600 hover:bg-green-700 text-white font-medium px-6 py-3 rounded-lg transition duration-200" > Update Profile </button>

        </div>
    </div>
    );
}