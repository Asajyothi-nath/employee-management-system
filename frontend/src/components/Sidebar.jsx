import { NavLink, useNavigate }
from "react-router-dom";

export default function AdminSidebar(){

    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem("user"));

    const handleLogout = () => {

        localStorage.removeItem("token");

        localStorage.removeItem("user");

        navigate("/login");
    };

    return(

        <div className="w-64 h-screen bg-green-600 text-white p-5 flex flex-col justify-between">

            <div>

                <h1 className="text-2xl font-bold mb-8">

                    Admin Panel
                </h1>

                <nav className="flex flex-col gap-4">
                {user?.role === "admin" ? (
                    <>
                    <NavLink to="/admin/home" className={({isActive}) =>
                        isActive
                        ? "bg-blue-600 p-2 rounded"
                        : "p-2"
                      }
                    >
                        Home
                    </NavLink>

                    <NavLink
                      to="/admin/users"
                      className={({isActive}) =>
                        isActive
                        ? "bg-blue-600 p-2 rounded"
                        : "p-2"
                      }
                    >
                        Users
                    </NavLink>

                    <NavLink
                      to="/admin/profile"
                      className={({isActive}) =>
                        isActive
                        ? "bg-blue-600 p-2 rounded"
                        : "p-2"
                      }
                    >
                        Profile
                    </NavLink>
                    </>
                ) : (
                    <>
                    <NavLink
                        to="/employee/dashboard"
                        className={({ isActive }) =>
                        isActive ? "bg-blue-600 p-2 rounded" : "p-2"
                        }
                    >
                        Dashboard
                    </NavLink>

                    <NavLink
                        to="/employee/profile"
                        className={({ isActive }) =>
                            isActive
                                ? "bg-blue-600 p-2 rounded"
                                : "p-2"
                        }
                    >
                        Profile
                    </NavLink>
                        </>

                    )}
                
                </nav>

            </div>

            {/* Logout Button */}

            <button onClick={handleLogout} className="bg-red-600 p-2 rounded w-full">Logout</button>

        </div>
    );
}