import { useContext, useEffect, useState } from "react";
// import { Navigate } from "react-router-dom";
import axios from "axios";
import AccountNav from "../components/AccountNav";
import { UserContext } from "../context/UserContext";
import Spinner from "../components/Spinner";

const ProfilePage = () => {
  const auth = useContext(UserContext);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get("/api/users/profile", {
          headers: {
            Authorization: auth.token,
          },
        });

        setUser(response.data.user);
      } catch (err) {
        console.log(err);
      }
    };

    if (auth.isLoggedIn) {
      fetchProfile();
    }
  }, [auth.isLoggedIn, auth.token]);

  return (
    <div>
      <AccountNav />
      {user ? (
        <div className="text-center max-w-lg mx-auto">
          Logged in as {user.name} ({user.email})<br />
          <button onClick={auth.logout} className="primary max-w-sm mt-2">
            Logout
          </button>
        </div>
      ) : (
        <div className="text-center max-w-lg mx-auto">
          {" "}
          <Spinner/>
          Loading User Profile...
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
