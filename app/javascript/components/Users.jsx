import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect((props) => {
    const url = "/api/v1/users/index";
    fetch(url)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((response) => setUsers(response))
      .catch(() => props.history.push("/"));
  }, []);

  const allUsers = users.map((user, index) => (
    <div key={index} className="user-index-info-div">
      <Link to={`/user/${user.id}`} className="user-index-link blue-link">
        {user.username}
      </Link>
    </div>
  ));

  const noUsers = (
    <div>
      <h4>No Users yet...</h4>
    </div>
  );

  return (
    <div className="user-index-div">
      {users.length > 0 ? allUsers : noUsers}
    </div>
  );
};

export default Users;
