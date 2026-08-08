import { useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import { toast } from "react-toastify";

export default function ForgotPassword() {

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleForgotPassword = async (e) => {

    e.preventDefault();

    if (!email.trim()) {
      toast.error("Email is required");
      return;
    }

    try {

      setLoading(true);

      const response = await axiosInstance.post(
        "http://localhost:8000/api/auth/forgot-password",
        {
          email
        }
      );

      toast.success(response.data.message);

      // For testing only
      console.log("Reset URL:", response.data.resetUrl);

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
        onSubmit={handleForgotPassword}
        className="bg-white shadow-md p-6 rounded w-96"
      >

        <h2 className="text-2xl font-bold mb-4">
          Forgot Password
        </h2>

        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border p-2 mb-4 rounded"
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded w-full"
        >
          {loading ? "Sending..." : "Send Reset Link"}
        </button>

      </form>
    </div>
  );
}