import {
  getCookie,
  setCookie,
  deleteCookie,
} from "cookies-next/client";

export type UserRole = "seeker" | "giver";

const TOKEN_KEY = "token";
const ROLE_KEY = "role";

/* ---------------------- Token ---------------------- */

export const saveToken = (token: string) => {
  setCookie(TOKEN_KEY, token, {
    maxAge: 60 * 60 * 24 * 30, // 30 days
    path: "/",
    sameSite: "lax",
  });
};

export const getToken = (): string | undefined => {
  return getCookie(TOKEN_KEY)?.toString();
};

export const removeToken = () => {
  deleteCookie(TOKEN_KEY);
};

/* ---------------------- Role ---------------------- */

export const saveRole = (role: UserRole) => {
  setCookie(ROLE_KEY, role, {
    maxAge: 60 * 60 * 24 * 30,
    path: "/",
    sameSite: "lax",
  });
};

export const getRole = (): UserRole | undefined => {
  return getCookie(ROLE_KEY) as UserRole | undefined;
};

export const updateRole = (role: UserRole) => {
  saveRole(role);
};

export const removeRole = () => {
  deleteCookie(ROLE_KEY);
};

/* ---------------------- Logout ---------------------- */

export const clearAuth = () => {
  removeToken();
  removeRole();
};