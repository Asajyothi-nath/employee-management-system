import { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";

//import axios from "axios";

import axiosInstance from "../utils/axiosInstance";


export default function AdminDashboard() {

  const [users, setUsers] = useState([]);
  //Edit User Details
  const [isModalOpen,setIsModalOpen] = useState(false);
  const [selectedUser,setSelectedUser] = useState(null);
  const [editName,setEditName] = useState("");
  const [editEmail,setEditEmail] = useState("");
  const [editRole,setEditRole] = useState("");
  const [editPhoneNumber,setEditPhoneNumber] = useState("");
  const navigate = useNavigate();

  //Add User Details
  const [isAddModalOpen,setIsAddModalOpen] = useState(false);
  const [addName,setAddName] = useState("");
  const [addEmail,setAddEmail] = useState("");
  const [addPassword,setAddPassword] = useState("");
  const [addRole,setAddRole] = useState("");
  const [addPhoneNumber,setAddPhoneNumber] = useState("");

  const [addLoading,setAddLoading] = useState(false);
  const [editLoading,setEditLoading] = useState(false);

  //For Pagination
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  //For Search
  const[search,setSearch] = useState("");
  const[roleFilter,setRoleFilter] = useState("");

  const [loading, setLoading] = useState(false);



  useEffect(() => {
    getUsers();

  }, [page, search, roleFilter]);


const getUsers = async () => {

   try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const res = await axiosInstance.get(

         `/admin/users?page=${page}&limit=5&search=${search}&role=${roleFilter}`,

         {
            headers:{
               Authorization:`Bearer ${token}`
            }
         }
      );

      setUsers(res.data.users);

      setTotalPages(res.data.totalPages);

   } catch(error) {

      console.log(error);
   } finally {
      setLoading(false);
   }
};


// DELETE USER
const handleDelete = async(id) => {
  const confirmDelete = window.confirm("Are you sure you want to delete this user?");
  if(!confirmDelete){ return; }
  try {
      const token = localStorage.getItem("token");
      await axiosInstance.delete(`/admin/users/${id}`,
        {

          headers: {
              Authorization: `Bearer ${token}`
          }
        }
      );
      toast.success("User Deleted");
      // refresh users list
      getUsers();

    } catch(error) {
      console.log(error.message);
      toast.error(error.message)
    }
};

// EDIT USER
const handleUpdateUser = async() => {
      //Name validation
      if(!editName.trim()){
        toast.error("Name is required");
        return;
      }
      //Email validation
      if(!editEmail.trim()){
        toast.error("Email is required");
        return;
      }
      //Simple Email Format
      const emailRegex=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if(!emailRegex.test(editEmail)){
        toast.error("Invalid Email Format");
        return;
      }

      //Phone Validation
      const phoneRegex = /^[0-9]{10}$/;
      if(!phoneRegex.test(editPhoneNumber.trim())){

          toast.error("Invalid phone number");

          return;
      }
      if(editLoading) return;
      const toastId = toast.loading("Updating user...");

    try{
      setEditLoading(true);
      const token = localStorage.getItem("token");
      await axiosInstance.put(`/admin/users/${selectedUser.id}`,
        {
          name:editName,
          email:editEmail,
          role:editRole,
          phone_number:editPhoneNumber
        },
        {
          headers:{
            Authorization:`Bearer ${token}`
          }
        }
      );
      toast.update(toastId,{
         render: "User updated successfully",
         type: "success",
         isLoading: false,
         autoClose: 2000
      });
      setIsModalOpen(false);
      getUsers();
      //In login screen we are storing the user details like an object so need to add JSON.parse for access the user details
      const loggedInUser = JSON.parse(localStorage.getItem("user"));
      //if admin edited themselves
      if(selectedUser.id === loggedInUser.id){
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          navigate("/login");
          return;
      }
    }
    catch(error){
      console.log(error);
      toast.update(toastId,{
         render: "Update failed",
         type: "error",
         isLoading: false,
         autoClose: 2000
      });
    }finally{
      setEditLoading(false);
    }
};

// ADD USER
const handleAddUser = async() => {
    //Name validation
    if(!addName.trim()){
      toast.error("Name is required");
      return;
    }
    //Email validation
    if(!addEmail.trim()){
      toast.error("Email is required");
      return;
    }
    //Simple Email Format
    const emailRegex=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!emailRegex.test(addEmail)){
      toast.error("Invalid email format");
      return;
    }

    //Password Validation
    if(addPassword.length<6){
      toast.error("Password must be atleast 6 characters");
      return;
    }
    
    //Phone Validation
    const phoneRegex = /^[0-9]{10}$/;

    if(!phoneRegex.test(addPhoneNumber.trim())){
      toast.error("Invalid phone number");
      return;
    }

    if(addLoading) return;
    const toastId = toast.loading("Adding user...");
    try{
        setAddLoading(true);
        const token = localStorage.getItem("token");
        await axiosInstance.post(`/admin/add/user`,
        {
          name:addName,
          email:addEmail,
          password:addPassword,
          role:addRole,
          phone_number:addPhoneNumber
        },
        {
          headers:{
            Authorization:`Bearer ${token}`
          }
        }
      );
      toast.update(toastId,{
         render: "User Added successfully",
         type: "success",
         isLoading: false,
         autoClose: 2000
      });
      setIsAddModalOpen(false);
      getUsers();

    }catch(error){
      toast.update(toastId,{
         render: "Add failed",
         type: "error",
         isLoading: false,
         autoClose: 2000
      });
    }finally{
      setAddLoading(false);
    }
};

const openEditModal = (user) => {
    setSelectedUser(user);
    setEditName(user.name);
    setEditEmail(user.email);
    setEditRole(user.role);
    setEditPhoneNumber(user.phone_number);
    setIsModalOpen(true);
};

const openAddModal = () => {
    setAddName("");
    setAddEmail("");
    setAddPassword("");
    setAddRole("employee");
    setAddPhoneNumber("");
    setIsAddModalOpen(true);
};

return (

    <div className="min-h-screen bg-gray-100 p-6">

      <div className="flex justify-between items-center mb-6">

  <div>
    <h1 className="text-3xl font-bold text-gray-800">
      Admin Dashboard
    </h1>

    <p className="text-gray-500 mt-1">
      Manage employees and administrators
    </p>
  </div>

  <button
    type="button"
    disabled={addLoading}
    onClick={openAddModal}
    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition disabled:opacity-50"
  >
    Add User
  </button>

</div>


      <div className="bg-white rounded-xl shadow-md p-6">

        <h2 className="text-xl font-semibold mb-4">All Users</h2>

        <div className="flex flex-col md:flex-row gap-4 mb-6">

        <input type="text" placeholder="Search by name or email" value={search} onChange={(e) => {
              setPage(1);setSearch(e.target.value);}} className="border p-2 rounded w-64"/>

        <select value={roleFilter} onChange={(e) => { setPage(1); setRoleFilter(e.target.value);
            }} className="border p-2 rounded">

            <option value="">All Roles</option>

            <option value="admin">Admin</option>

            <option value="employee">Employee</option>

        </select>

      </div>



      <div className="overflow-x-auto">
        {loading ? (
          <div className="text-center py-8">
            <p className="text-gray-500 text-lg">
              Loading users...
            </p>
          </div>
        ):(
        <table className="min-w-full border-collapse">

          <thead className="bg-gray-100">

            <tr className="p-3 text-left">

              <th className="p-3 text-left">ID</th>

              <th className="p-3 text-left">Name</th>

              <th className="p-3 text-left">Email</th>

              <th className="p-3 text-left">Role</th>

              <th className="p-3 text-left">Phone Number</th>

              <th className="p-3 text-left">Actions</th>

            </tr>

          </thead>


          <tbody>

  {users.length > 0 ? (

    users.map((user) => (

      <tr key={user.id} className="hover:bg-gray-50 border-b">

        <td className="p-3">{user.id}</td>

        <td className="p-3">{user.name}</td>

        <td className="p-3">{user.email}</td>

        <td className="p-3">{user.role}</td>

        <td className="p-3">{user.phone_number}</td>

        <td className="p-3 space-x-2">

          <button
            type="button"
            disabled={editLoading}
            onClick={() => openEditModal(user)}
            className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
          >
            Edit
          </button>

          <button
            onClick={() => handleDelete(user.id)}
            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
          >
            Delete
          </button>

        </td>

      </tr>

    ))

  ) : (

    <tr>

      <td
        colSpan="6"
        className="text-center py-6 text-gray-500"
      >
        No users found
      </td>

    </tr>

  )}

</tbody>

        </table>
        )}
        </div>

        <div className="flex justify-center items-center gap-4 mt-4">

          <button disabled={page === 1} onClick={() => setPage(page - 1)} className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg disabled:opacity-50">Prev</button>

          <span>Page {page} of {totalPages} </span>

          <button disabled={page === totalPages} onClick={() => setPage(page + 1)} className="bg-gray-500 hover:bg-gray-700 text-white px-4 py-2 rounded-lg disabled:opacity-50">Next</button>

        </div>

        {//Edit PopUp Starts

            isModalOpen && (

              <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">

                <div className="bg-white p-6 rounded-xl shadow-lg w-96">

                  <h2 className="text-2xl font-bold mb-4">Edit User</h2>


                  <input type="text" value={editName} onChange={(e) => setEditName(e.target.value)} placeholder="Name" className="w-full border p-2 mb-3 rounded"/>


                  <input type="email" value={editEmail} onChange={(e) => setEditEmail(e.target.value)} placeholder="Email" className="w-full border p-2 mb-3 rounded"/>


                  <select value={editRole} onChange={(e) => setEditRole(e.target.value)} className="w-full border p-2 mb-4 rounded">

                    <option value="employee">Employee</option>

                    <option value="admin"> Admin</option>

                  </select>

                  <input type="text" value={editPhoneNumber} onChange={(e) => setEditPhoneNumber(e.target.value)} placeholder="Phone Number" className="w-full border p-2 mb-3 rounded"/>


                  <div className="flex justify-end gap-3">

                    <button onClick={() => setIsModalOpen(false)} className="bg-gray-400 text-white px-4 py-2 rounded">Cancel</button>
                    <button onClick={handleUpdateUser} className="bg-green-600 text-white px-4 py-2 rounded">Save</button>

                  </div>

                </div>

              </div>
            )
            //Edit PopUp Ends
          }
          {
            //Add PopUp Starts
            isAddModalOpen && (

              <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">

                <div className="bg-white p-6 rounded-xl shadow-lg w-96">

                  <h2 className="text-2xl font-bold mb-4">Add User</h2>


                  <input type="text" value={addName} onChange={(e) => setAddName(e.target.value)} placeholder="Name" className="w-full border p-2 mb-3 rounded"/>


                  <input type="email" autoComplete="off" value={addEmail} onChange={(e) => setAddEmail(e.target.value)} placeholder="Email" className="w-full border p-2 mb-3 rounded"/>

                  <input type="password" autoComplete="new-password" value={addPassword} onChange={(e) => setAddPassword(e.target.value)} placeholder="Password" className="w-full border p-2 mb-3 rounded"/>


                  <select value={addRole} onChange={(e) => setAddRole(e.target.value)} className="w-full border p-2 mb-4 rounded">

                    <option value="employee">Employee</option>

                    <option value="admin"> Admin</option>

                  </select>

                  <input type="tel" value={addPhoneNumber} onChange={(e) => setAddPhoneNumber(e.target.value)} placeholder="Phone Number" className="w-full border p-2 mb-3 rounded"/>


                  <div className="flex justify-end gap-3">

                    <button onClick={() => setIsAddModalOpen(false)} className="bg-gray-400 text-white px-4 py-2 rounded">Cancel</button>
                    <button onClick={handleAddUser} className="bg-green-600 text-white px-4 py-2 rounded">Save</button>

                  </div>

                </div>

              </div>
            )
            //Add Popup Ends
          }

      </div>

    </div>
  );
}