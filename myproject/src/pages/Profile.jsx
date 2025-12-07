import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { ShopContext } from "../context/ShopContext";

const Profile = () => {
  const { backendUrl, token } = useContext(ShopContext);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`${backendUrl}/api/user/profile`, {
          headers: { token },
        });
        setUser(res.data);
      } catch (err) {
        console.error("Failed to fetch user profile", err);
      }
    };
    if (token) fetchUser();
  }, [backendUrl, token]);

  if (!user) return <p className="p-5">Loading profile...</p>;

  return (
    <div className="p-5">
      <h1 className="text-xl font-bold mb-3">My Profile</h1>
      {/* <p><strong>Name:</strong> {user.name}</p> */}
      <div dangerouslySetInnerHTML={{ __html: user.name }}></div>
      <p><strong>Email:</strong> {user.email}</p>
      {/* Add more fields if needed */}
    </div>
  );
};

export default Profile;
