import { Route, Routes, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import IndexPage from "./pages/IndexPage";
import LoginPage from "./pages/LoginPage";
import Layout from "./components/Layout";
import RegisterPage from "./pages/RegisterPage";
import axios from "axios";

import ProfilePage from "./pages/ProfilePage";
import PlacesPage from "./pages/PlacesPage";
import PlacesFormPage from "./pages/PlacesFormPage";
import PlacePage from "./pages/PlacePage";
import BookingsPage from "./pages/BookingsPage";
import BookingPage from "./pages/BookingPage";
import { UserContext } from "./context/UserContext";
import { useAuth } from "./hooks/auth-hook";
import Spinner from "./components/Spinner";

axios.defaults.baseURL = process.env.REACT_APP_BASEURL;
axios.defaults.withCredentials = true;

function App() {
  const { token, login, logout, userId } = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (token !== null) {
      setIsLoading(false);
    }
  }, [token]);

  if (isLoading) {
    return <Spinner />;
  }

  let routes;

  if (token) {
    routes = (
      <Route path="/" element={<Layout />}>
        <Route exact index element={<IndexPage />} />
        <Route exact path="/login" element={<LoginPage />} />
        <Route exact path="/register" element={<RegisterPage />} />
        <Route exact path="/account" element={<ProfilePage />} />
        <Route exact path="/account/places" element={<PlacesPage />} />
        <Route exact path="/account/places/new" element={<PlacesFormPage />} />
        <Route exact path="/account/places/:id" element={<PlacesFormPage />} />
        <Route exact path="/place/:id" element={<PlacePage />} />
        <Route exact path="/account/bookings" element={<BookingsPage />} />
        <Route exact path="/account/bookings/:id" element={<BookingPage />} />
      </Route>
    );
  } else {
    routes = (
      <Route path="/" element={<Layout />}>
        <Route exact index element={<IndexPage />} />
        <Route exact path="/login" element={<LoginPage />} />
        <Route exact path="/register" element={<RegisterPage />} />
        <Route exact path="/place/:id" element={<PlacePage />} />
        <Route path="*" element={<Navigate replace to="/login" />} />
      </Route>
    );
  }

  return (
    <UserContext.Provider
      value={{
        isLoggedIn: !!token,
        token: token,
        userId: userId,
        login: login,
        logout: logout,
      }}
    >
      <Routes>{routes}</Routes>
    </UserContext.Provider>
  );
}

export default App;
