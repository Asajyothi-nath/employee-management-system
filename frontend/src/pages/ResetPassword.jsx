import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import { toast } from "react-toastify";

export default function ResetPassword() {

  const { token } = useParams();

  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const handleResetPassword = async (e) => {

    e.preventDefault();

    if (password.length < 6) {

      toast.error(
        "Password must be at least 6 characters"
      );

      return;
    }

    if (password !== confirmPassword) {

      toast.error("Passwords do not match");

      return;
    }

    try {

      setLoading(true);

      const response = await axiosInstance.post(

        `http://localhost:8000/api/auth/reset-password/${token}`,

        {
          password
        }
      );

      toast.success(response.data.message);

      setTimeout(() => {

        navigate("/login");

      }, 2000);

    } catch (error) {

      toast.error(
        error.response?.data?.message || "Something went wrong"
      );

    } finally {

      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">

      <form
        onSubmit={handleResetPassword}
        className="bg-white shadow-md p-6 rounded w-96"
      >

        <h2 className="text-2xl font-bold mb-4">
          Reset Password
        </h2>

        <input
          type="password"
          placeholder="New Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          className="w-full border p-2 mb-3 rounded"
        />

        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) =>
            setConfirmPassword(e.target.value)
          }
          className="w-full border p-2 mb-4 rounded"
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-green-600 text-white px-4 py-2 rounded w-full"
        >
          {loading ? "Resetting..." : "Reset Password"}
        </button>

      </form>
    </div>
  );
}