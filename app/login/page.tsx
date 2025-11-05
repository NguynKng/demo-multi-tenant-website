"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginUser } from "@/services/authApi";

export default function LoginPage() {
  const router = useRouter();

  const [loginRequest, setLoginRequest] = useState({
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginRequest((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await loginUser(loginRequest.email, loginRequest.password)
      console.log(response)
      if (response?.success) {
        router.push(`/tenant/${response.user?.slug}`); // ✅ Điều hướng sau đăng nhập
      } else {
        setMessage(response?.message || "Đăng nhập thất bại!");
      }
    } catch (err) {
      console.error(err);
      setMessage("Đã xảy ra lỗi trong quá trình đăng nhập!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-sm"
      >
        <h1 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          Đăng nhập hệ thống
        </h1>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="text"
            name="email"
            placeholder="Nhập email..."
            value={loginRequest.email}
            onChange={handleFormChange}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Mật khẩu
          </label>
          <input
            type="password"
            name="password"
            placeholder="Nhập mật khẩu..."
            value={loginRequest.password}
            onChange={handleFormChange}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700"
          />
        </div>

        {message && (
          <p className="mb-4 text-sm text-red-500 text-center">{message}</p>
        )}

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 rounded-lg text-white font-medium transition-all duration-200 ${
            loading
              ? "bg-blue-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loading ? "Đang đăng nhập..." : "Đăng nhập"}
        </button>
      </form>
    </div>
  );
}
