import { createContext } from "react";

export const UserContext = createContext({
  isLoggedIn: false,
  userId: null,
  token: null,
  name:null,
  login: () => {},
  logout: () => {},
});
