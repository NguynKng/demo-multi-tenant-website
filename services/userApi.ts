"use server";

import { getServerApi } from "./api";
import { ApiResponse } from "@/types/ApiResponse";
import { User } from "@/types/User";

export const getUserProfileBySlug = async (
  slug: string
): Promise<ApiResponse<User>> => {
  try {
    // 👇 Gắn kiểu cho response luôn
    const api = await getServerApi();
    const response = await api.get(`/user/profile/slug/${slug}`);

    // ✅ Trả về đúng cấu trúc ApiResponse
    return {
      success: response.data.success,
      message: response.data.message,
      data: response.data.user,
    };
  } catch (error: any) {
    console.error("❌ Lỗi khi lấy profile:", error);
    return {
      success: false,
      message:
        error.response?.data?.message ||
        "Đã có lỗi xảy ra khi lấy thông tin người dùng",
      data: {} as User,
    };
  }
};
