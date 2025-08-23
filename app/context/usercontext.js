"use client";

import { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) return;

    const fetchUser = async () => {
      try {
        const res = await fetch("/api/auth", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) {
          localStorage.removeItem("authToken");
          setUser(null);
          return;
        }
        const data = await res.json();
        setUser(data.user);
      } catch (err) {
        console.error(err);
        localStorage.removeItem("authToken");
        setUser(null);
      }
    };

    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
