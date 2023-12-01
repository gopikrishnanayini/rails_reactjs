import React, { useState, useEffect } from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Home from "../components/Home";
import Recipes from "../components/Recipes";
import Recipe from "../components/Recipe";
import NewRecipe from "../components/NewRecipe";
import EditRecipe from "../components/EditRecipe";
import UserContext from "../components/context/UserContext";
import Nav from "../components/Nav";
import Users from "../components/Users";
import User from "../components/User";

const Index = () => {
  const [user, setUser] = useState({});

  useEffect(() => {
    const url = "/api/v1/user_info";

    const token = document.querySelector('meta[name="csrf-token"]').content;

    fetch(url, {
      method: "GET",
      headers: {
        "X-CSRF-Token": token,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((response) => setUser(response))
      .catch((error) => console.log(error.message));
  }, []);

  return (
    <UserContext.Provider value={[user, setUser]}>
      <Router>
        <Nav />
        <div className="nav-clearance">
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/recipes" exact component={Recipes} />
            <Route path="/recipe/:id" exact component={Recipe} />
            <Route path="/new_recipe" exact component={NewRecipe} />
            <Route path="/edit_recipe/:id" exact component={EditRecipe} />
            <Route path="/users" exact component={Users} />
            <Route path="/user/:id" exact component={User} />
          </Switch>
        </div>
      </Router>
    </UserContext.Provider>
  );
};

export default Index;
