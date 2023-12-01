import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../components/context/UserContext";

const User = (props) => {
  const [shUser, setShUser] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [user, setUser] = useContext(UserContext);
  const [allRecipes, setAllRecipes] = useState("");

  const loadUser = () => {
    const {
      match: {
        params: { id },
      },
    } = props;

    const url = `/api/v1/user/${id}`;

    fetch(url)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((response) => setShUser(response))
      .catch(() => props.history.push("/recipes"));
  };

  const loadUserRecipes = () => {
    const {
      match: {
        params: { id },
      },
    } = props;

    const url = `/api/v1/recipes/user_recipes/${id}`;

    fetch(url)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((response) => setRecipes(response))
      .catch(() => props.history.push("/recipes"));
  };

  useEffect(() => {
    loadUser();
    loadUserRecipes();
  }, []);

  // update page when params updates
  useEffect(() => {
    loadUser();
    loadUserRecipes();
  }, [props]);

  useEffect(() => {
    if (recipes.length === 0) {
      if (user.current_user && shUser) {
        if (shUser.id === user.current_user.id) {
          setAllRecipes(
            <div className="no-recipes-div">
              <h4 className="noRecipeText">
                No recipes yet. Why not{" "}
                <Link to="/new_recipe" className="blue-link">
                  create one
                </Link>
              </h4>
            </div>
          );
        } else {
          setAllRecipes(
            <div className="no-recipes-div">
              <h4 className="noRecipeText">
                {shUser.username} hasn't shared any recipes yet.
              </h4>
            </div>
          );
        }
      }
    } else {
      const recipesJsx = recipes.map((recipe, index) => {
        return (
          <div key={index}>
            <div className="recipe-container">
              <img
                src={`assets/${recipe.image}`}
                alt={`${recipe.name} image`}
                height="300"
                width="300"
              />
              <p>{recipe.name}</p>
              <Link to={`/recipe/${recipe.id}`} className="view-recipe-link">
                View Recipe
              </Link>
            </div>
          </div>
        );
      });

      setAllRecipes(recipesJsx);
    }
  }, [recipes, user, shUser]);

  return (
    <div className="user-show-container">
      <div className="user-show-header-info">
        <div className="user-show-info-div">
          <p className="user-show-username">{shUser.username}</p>

          <div className="user-show-head-inner-div">
            <p className="user-show-name">{`${shUser.first_name} ${shUser.last_name}`}</p>
            {shUser.bio ? (
              <p className="user-show-bio">{shUser.bio}</p>
            ) : (
              <div></div>
            )}
            <p className="user-show-recipe-count">Recipes: {recipes.length}</p>
          </div>
        </div>
      </div>

      <div className="recipe-index-grid">{allRecipes}</div>
    </div>
  );
};

export default User;
