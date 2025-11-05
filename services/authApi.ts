"use server";

import { getServerApi } from "./api";
import { LoginResponse } from "@/types/ApiResponse";
import { User } from "@/types/User";
import { setTokenCookie } from "./cookies";

export const loginUser = async (
  email: string,
  password: string
): Promise<LoginResponse<User>> => {
  try {
    const api = await getServerApi();
    const res = await api.post("/auth/login", { email, password });
    console.log(res)
    setTokenCookie(res.data.token);
    return {
      success: res.data.success,
      message: res.data.message,
      token: res.data.token,
      user: res.data.user,
    };
  } catch (error: any) {
    console.error("❌ Lỗi khi đăng nhập:", error);

    // Nếu là lỗi từ server
    const serverMessage =
      error.response?.data?.message || "Đã có lỗi xảy ra khi đăng nhập";

    return {
      success: false,
      message: serverMessage,
      token: "",
      user: null,
    };
  }
};
