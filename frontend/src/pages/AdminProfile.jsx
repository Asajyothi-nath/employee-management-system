import { useState } from "react";

import { toast } from "react-toastify";

export default function AdminProfile(){

    const user = JSON.parse(localStorage.getItem("user"));

    const [isEditOpen,setIsEditOpen] = useState(false);

    const [name,setName] = useState(user?.name || "");

    const [phoneNumber,setPhoneNumber] = useState(user?.phone_number || "");

    const handleUpdateProfile = () => {

        const updatedUser = {

            ...user,

            name,

            phone_number:phoneNumber
        };

        localStorage.setItem("user",JSON.stringify(updatedUser));

        toast.success("Profile Updated");

        setIsEditOpen(false);
    };

    return(

        <div className="p-6">

            <h1 className="text-3xl font-bold mb-6">

                Admin Profile
            </h1>

            <div className="bg-white shadow rounded p-6 max-w-2xl">

                {/* Profile Image */}

                <div className="flex justify-center mb-6">

                    <img src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" alt="profile" className="w-28 h-28 rounded-full border"/>

                </div>

                {/* User Details */}

                <div className="space-y-4">

                    <div>

                        <label className="font-semibold">Name</label>

                        <p className="text-gray-700">{user?.name}</p>

                    </div>

                    <div>

                        <label className="font-semibold">Email</label>

                        <p className="text-gray-700">{user?.email}</p>

                    </div>

                    <div>

                        <label className="font-semibold">Role</label>

                        <p className="text-gray-700 capitalize">{user?.role}</p>

                    </div>

                    <div>

                        <label className="font-semibold">Phone Number</label>

                        <p className="text-gray-700">{user?.phone_number}</p>

                    </div>

                    <div>

                        <label className="font-semibold">Last Login</label>

                        <p className="text-gray-700">{user?.last_login || "Today"}</p>

                    </div>

                </div>

                {/* Buttons */}

                <div className="flex gap-4 mt-8">

                    <button onClick={() => setIsEditOpen(true)} className="bg-blue-600 text-white px-4 py-2 rounded">Edit Profile</button>

                    

                </div>

            </div>

            {/* Edit Modal */}

            {

                isEditOpen && (

                    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">

                        <div className="bg-white p-6 rounded w-96">

                            <h2 className="text-2xl font-bold mb-4">Edit Profile</h2>

                            <input type="text" value={name} onChange={(e)=>setName(e.target.value)} placeholder="Name" className="w-full border p-2 mb-4 rounded"/>

                            <input type="tel" value={phoneNumber} onChange={(e)=>setPhoneNumber(e.target.value)} placeholder="Phone Number" className="w-full border p-2 mb-4 rounded"/>

                            <div className="flex justify-end gap-3">

                                <button onClick={() =>setIsEditOpen(false)}className="bg-gray-400 text-white px-4 py-2 rounded">Cancel</button>

                                <button onClick={handleUpdateProfile} className="bg-green-600 text-white px-4 py-2 rounded">Save</button>

                            </div>

                        </div>

                    </div>
                )
            }

        </div>
    );
}