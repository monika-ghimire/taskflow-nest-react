import { jwtDecode } from "jwt-decode";

interface UserInfo {
  userId: number;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  [key: string]: any;
}

export const getLoginInfo = (): UserInfo | null => {
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    const decoded: UserInfo = jwtDecode<any>(token); // decode as any, then type as UserInfo
    return decoded;
  } catch (error) {
    console.error("Invalid token:", error);
    return null;
  }
};
