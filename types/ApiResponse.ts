export interface ApiResponse<T> {
    success: boolean;
    message?: string;
    data: T;
}

export interface LoginResponse<T> {
    success: boolean;
    message?: string;
    token: string;
    user: T | null;
}