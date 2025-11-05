"use server";

import { getServerApi } from "./api";
import { ApiResponse } from "@/types/ApiResponse";
import { Company } from "@/types/Company";

const getAllCompanies = async (): Promise<ApiResponse<Company[]>> => {
  try {
    const api = await getServerApi();
    const response = await api.get("/company");
    return {
      success: response.data.success,
      message: response.data.message,
      data: response.data.data,
    };
  } catch (error) {
    return {
      success: false,
      message: "Failed to fetch companies",
      data: [] as Company[],
    };
  }
};

const getCompanyBySlug = async (
  slug: string
): Promise<ApiResponse<Company>> => {
  try {
    const api = await getServerApi();
    const response = await api.get(`/company/get-company-by-slug/${slug}`);

    return {
      success: response.data.success,
      message: response.data.message,
      data: response.data.data || ({} as Company),
    };
  } catch (error) {
    return {
      success: false,
      message: "Failed to fetch company",
      data: {} as Company,
    };
  }
};

export { getAllCompanies, getCompanyBySlug };
