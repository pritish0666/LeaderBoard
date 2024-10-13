import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";

const UserList = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  const onClaim = () => {
    if (!selectedUser) {
      alert("Please select a user to claim points.");
      return;
    }

    const generateRandomPoints = Math.floor(Math.random() * 10) + 1;
    console.log("Generated points:", generateRandomPoints);

    fetch("http://localhost:5000/users/claim", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: selectedUser,
        points: generateRandomPoints,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Claim response:", data);
        const updatedUsers = users.map((user) => {
          if (user._id === selectedUser) {
            return { ...user, points: user.points + generateRandomPoints };
          }
          return user;
        });
        setUsers(updatedUsers);
      })
      .catch((error) => console.error("Error claiming points:", error));
  };

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch("http://localhost:5000/users/");
      const data = await response.json();
      console.log("Fetched users:", data);
      setUsers(data);
    };
    fetchUsers();
  }, []);

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">User List</h1>

      {/* Leaderboard Button */}
      <div className="d-flex justify-content-center mb-3">
        <button
          className="btn btn-outline-info"
          onClick={() => navigate("/leaderboard")}
          style={{ padding: "10px 20px", fontWeight: "bold" }}
        >
          Check Leaderboard
        </button>
      </div>

      {/* Claim Points Button */}
      <div className="text-center mb-4">
        <button
          className="btn btn-success"
          onClick={onClaim}
          disabled={!selectedUser}
          style={{ padding: "10px 20px", fontWeight: "bold" }}
        >
          Claim Points
        </button>
      </div>

      {/* User List */}
      <ul className="list-group">
        {users.map((user) => (
          <li
            key={user._id}
            className={`list-group-item d-flex justify-content-between align-items-center ${
              user._id === selectedUser ? "active list-group-item-primary" : ""
            }`}
            onClick={() => setSelectedUser(user._id)}
            style={{
              cursor: "pointer",
              borderRadius: "8px",
              marginBottom: "10px",
            }}
          >
            <div>
              <h5 className="mb-1">{user.name}</h5>
              <p className="mb-0 text-muted">Points: {user.points}</p>
            </div>
            <span
              className="badge bg-primary rounded-pill"
              style={{ fontSize: "1rem" }}
            >
              {user.points} pts
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
