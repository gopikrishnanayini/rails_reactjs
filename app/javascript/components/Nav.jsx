import React, { useContext } from "react";
import UserContext from "../components/context/UserContext";
import { Link } from "react-router-dom";

const Index = () => {
  const [user, setUser] = useContext(UserContext);

  return (
    <div className="nav-div">
      <Link to="/recipes" className="nav-text nav-link">
        Recipes
      </Link>
      <Link
        to={`/user/${user.current_user ? user.current_user.id : ""}`}
        className="nav-text"
      >
        {user.current_user ? user.current_user.username : "..."}
      </Link>

      <div className="dropdown-div">
        <p className="nav-text">More ▼</p>
        <div className="nav-dropdown-content">
          <div className="nav-drp-dwn-inner">
            <Link to="/users" className="drop-text nav-link">
              Community
            </Link>
            <Link
              to={`/user/${user.current_user ? user.current_user.id : ""}`}
              className="drop-text nav-link"
            >
              Profile
            </Link>
            <a className="drop-text nav-link" href="/users/edit">
              Settings
            </a>
            <a
              className="drop-text nav-link"
              rel="nofollow"
              data-method="delete"
              href="/users/sign_out"
            >
              Logout
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
