// src/services/api.server.ts
"use server";

import axios from "axios";
import Config from "@/envVars";
import { cookies } from "next/headers";

// Trả về một axios instance đã attach token từ cookies
export const getServerApi = async () => {
  const cookieStore = await cookies(); // cookies() trả về ReadonlyRequestCookies
  const token = cookieStore.get("token")?.value;
  return axios.create({
    baseURL: `${Config.BACKEND_URL}/api/v1`,
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
};
