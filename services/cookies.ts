// src/services/cookies.server.ts
"use server";

import { cookies } from "next/headers";

export const setTokenCookie = async (token: string) => {
  const cookieStore = await cookies();
  cookieStore.set({
    name: "token",
    value: token,
    domain: ".localhost",
    secure: false,
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 24 * 60 * 60 * 1000
  });
};

export const getTokenCookie = async () => {
  const cookieStore = await cookies();
  return cookieStore.get("token")?.value;
};

export const deleteTokenCookie = async () => {
  const cookieStore = await cookies();
  cookieStore.delete("token");
};
