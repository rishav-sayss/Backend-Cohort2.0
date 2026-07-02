"use client";

import { api } from "@/lib/api";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
    let [loading,  setloading]  = useState(true)
      let router = useRouter();
  let hydrateUser = async () => {
    try {
      const res = await api.get("/api/auth/me");
      console.log(res.data);
      setUser(res.data.user);
        router.push("/layout/home");
    } catch (error) {
      console.log(error.response?.status);
      console.log(error.response?.data);
      setUser(null);
    }finally {
      setloading(false);
    }
  };

  useEffect(() => {
    hydrateUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        hydrateUser,
        loading
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
