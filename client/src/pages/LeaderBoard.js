import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const LeaderBoard = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch("http://localhost:5000/users/leaderboard");
      const data = await response.json();
      console.log("Leaderboard data:", data);
      setUsers(data);
    };
    fetchUsers();
  }, []);

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Leaderboard</h1>

      {/* Leaderboard List */}
      <ul className="list-group">
        {users.map((user, index) => (
          <li
            key={user._id}
            className="list-group-item d-flex justify-content-between align-items-center"
            style={{ borderRadius: "8px", marginBottom: "10px" }}
          >
            <div className="d-flex align-items-center">
              <span
                className="badge bg-primary rounded-pill me-3"
                style={{ fontSize: "1.2rem" }}
              >
                #{index + 1}
              </span>
              <div>
                <h5 className="mb-1">{user.name}</h5>
                <p className="mb-0 text-muted">Points: {user.points}</p>
              </div>
            </div>
            <span
              className="badge bg-success rounded-pill"
              style={{ fontSize: "1.2rem" }}
            >
              {user.points} pts
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LeaderBoard;
