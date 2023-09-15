import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const UserContext = createContext({});

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const tokenCookie = document.cookie;
    const storedToken = tokenCookie ? tokenCookie.split('=')[1] : null;
    // console.log(storedToken)
    // console.log(tokenCookie);
    if (storedToken !== null) {
      axios.get("/api/users/profile").then(({ data }) => {
        setReady(true);
        setUser(data);
      });
    }
  }, [ready]);

  return (
    <UserContext.Provider value={{ user, setUser, ready }}>
      {children}
    </UserContext.Provider>
  );
};
