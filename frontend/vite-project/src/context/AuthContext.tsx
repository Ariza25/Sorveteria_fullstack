import { createContext, useState, FunctionComponent, useEffect } from "react";
import { api } from "../services/axios";

type User = {
  id: string;
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};


type AuthContextType = {
  signOut: () => void;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (name: string, email: string, password: string, confirmPassword: string) => Promise<void>;
  user: User;
};

export const AuthContext = createContext({} as AuthContextType);

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthProvider: FunctionComponent<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User>({
    id: "",
    email: "",
    name: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    const token = userId ? localStorage.getItem(`token-${userId}`) : null;
    const user = userId ? localStorage.getItem(`user-${userId}`) : null;

    if (token && user) {
      setUser(JSON.parse(user));
    }
  }, []);

  async function signIn(email: string, password: string) {
    try {
      const response = await api.post("/v1/api/login", {
        email,
        password,
      });

      if (user.id && user.id !== response.data.user.id) {
        localStorage.removeItem(`cart-${user.id}`);
        localStorage.removeItem(`selectedProduct-${user.id}`);
      }

      localStorage.setItem("userId", response.data.user.id);
      localStorage.setItem(
        `token-${response.data.user.id}`,
        response.data.user.token
      );
      localStorage.setItem(
        `user-${response.data.user.id}`,
        JSON.stringify(response.data.user)
      );

      setUser(response.data.user);
    } catch (error) {
      console.error("Error during login:", error);
    }
  }

  async function signUp(name: string, email: string, password: string, confirmPassword: string) {
    try {
      const response = await api.post("/v1/api/register", {
        name,
        email,
        password,
        confirmPassword
      });

      if (user.id && user.id !== response.data.user.id) {
        localStorage.removeItem(`cart-${user.id}`);
        localStorage.removeItem(`selectedProduct-${user.id}`);
      }

      localStorage.setItem("userId", response.data.user.id);
      localStorage.setItem(
        `token-${response.data.user.id}`,
        response.data.user.token
      );
      localStorage.setItem(
        `user-${response.data.user.id}`,
        JSON.stringify(response.data.user)
      );

      setUser(response.data.user);
    } catch (error) {
      console.error("Error during login:", error);
    }
  }


  function signOut() {
    localStorage.removeItem(`token-${user.id}`);
    localStorage.removeItem(`user-${user.id}`);
    localStorage.removeItem("userId");
    setUser({} as User);
  }

  return (
    <AuthContext.Provider value={{ signOut, user, signIn, signUp }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
