import React, { useEffect, useState } from "react";
import { fetchUsers } from "../services/api";

const UserProfile = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const { data } = await fetchUsers();
        setUsers(data);
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    };
    loadUsers();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>👤 Users</h2>
      {users.length === 0 ? (
        <p>No users found</p>
      ) : (
        <ul>
          {users.map((user) => (
            <li key={user._id}>
              <strong>{user.username}</strong> - {user.email}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UserProfile;
