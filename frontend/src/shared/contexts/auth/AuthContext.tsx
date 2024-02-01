import { createContext, useContext } from "react";
import { User } from "types";

export type AuthContextType = {
  user: User | null;
  signin: (
    email: string,
    password: string
  ) => Promise<boolean | string>;
  signout: () => void;
  profile: () => void;
};

export const AuthContext = createContext<AuthContextType>(null!);

export const useAuthContext = () => {
  return useContext(AuthContext);
};
