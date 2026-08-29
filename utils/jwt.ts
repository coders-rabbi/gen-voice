import { jwtDecode, type JwtPayload } from "jwt-decode";

export type AuthPayload = JwtPayload & {
  _id: string;
  email: string;
  role: string;
  isDeleted: boolean;
};

export const decodedToken = (token: string): AuthPayload => {
  return jwtDecode<AuthPayload>(token);
};
