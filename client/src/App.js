import { Route, Routes } from "react-router-dom";
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

axios.defaults.baseURL = "http://localhost:5000";
// axios.defaults.baseURL = "https://airbnb-clone-react-server.onrender.com";
axios.defaults.withCredentials = true;

function App() {
  return (
    <Routes>
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
    </Routes>
  );
}

export default App;
