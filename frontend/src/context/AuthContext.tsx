import { createContext, useCallback, useState } from "react";

interface IData {
  email: string;
  password: string;
  repeatPassword?: string;
}
interface UserSession {
  isLoggedIn: boolean;
  userId: string;
  email: string;
  userImg: string;
}

interface AuthContextType {
  userSession: UserSession | null;
  login: (data: IData) => void;
  register: (data: IData) => void;
  logout: () => void;
}

interface IAuthProvider {
  children: React.ReactNode;
}

export const AuthContext = createContext<AuthContextType>({
  userSession: null,
  login: () => {},
  register: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: IAuthProvider) => {
  const [userSession, setUserSession] = useState<UserSession | null>(() => {
    const user = sessionStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  });

  const login = useCallback(async (data: IData) => {
    const userData = await fetch("http://localhost:5000/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => data);

    if (userData.userId) {
      sessionStorage.setItem("user", JSON.stringify(userData));
      setUserSession(userSession);
      window.location.href = "/";
    } else {
      return { message: userData.message };
    }
  }, []);

  const register = useCallback(async (data: IData) => {
    const userData = await fetch("http://localhost:5000/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => data);

    if (userData.userId) {
      console.log(userData);
      sessionStorage.setItem("user", JSON.stringify(userData));
      setUserSession(userSession);
      window.location.href = "/";
    } else {
      console.log(userData);
      return { message: userData.message };
    }
  }, []);

  const logout = useCallback(() => {
    sessionStorage.removeItem("user");
    setUserSession(null);
    window.location.href = "/auth";
  }, []);

  return (
    <AuthContext.Provider value={{ userSession, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};
