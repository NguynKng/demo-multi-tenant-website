import Config from "@/envVars";

export const getBackendImgUrl = (path: string) => {
    if (!path) return "";
    return `${Config.BACKEND_URL}${path}`;
}