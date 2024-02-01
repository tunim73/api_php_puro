import { useEffect, useState } from "react";
import { User } from "types/User";
import { authApi } from "services";
import { AuthContext } from ".";
import { isApiException } from "types";

export const AuthProvider = ({ children }: { children: JSX.Element }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    profile();
  }, []);

  const profile = async () => {
    const data = await authApi.verifyToken();
    if (!data) {
      setUser(null);
      return;
    }
    setUser(data.user);
  };

  const signin = async (email: string, password: string) => {
    const data = await authApi.signin(email, password);

    if (!data) return false;

    if (isApiException(data)) return data.message;

    setUser(data.user);
    localStorage.setItem("authToken", data.token);
    return true;
  };

  const signout = () => {
    localStorage.removeItem("authToken");
    setUser(null);
    return;
  };

  return (
    <AuthContext.Provider value={{ user, signin, signout, profile }}>
      {children}
    </AuthContext.Provider>
  );
};
