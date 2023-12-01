import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../components/context/UserContext";

const Recipe = (props) => {
  const [recipe, setRecipe] = useState("");
  const [ingredientList, setIngredientsList] = useState(
    "No ingredients available"
  );
  const [user, setUser] = useContext(UserContext);

  let recipeOwner;
  if (user.current_user !== undefined && recipe !== "") {
    recipeOwner = user.current_user.id === recipe.user_id ? true : false;
  } else {
    recipeOwner = false;
  }

  const [recipeInstruction, setRecipeInstruction] = useState("");

  useEffect(() => {
    const {
      match: {
        params: { id },
      },
    } = props;

    const url = `/api/v1/show/${id}`;

    fetch(url)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((response) => setRecipe(response))
      .catch(() => props.history.push("/recipes"));
  }, []);

  const addHtmlEntities = (str) => {
    return String(str).replace(/&lt;/g, "<").replace(/&gt;/g, ">");
  };

  useEffect(() => {
    if (recipe !== "") {
      let listAry;

      if (recipe.ingredients.length > 0) {
        listAry = recipe.ingredients.split(",").map((ingredient, index) => (
          <li className="recipe-show-li" key={index}>
            {ingredient}
          </li>
        ));
        setIngredientsList(listAry);
      }

      setRecipeInstruction(addHtmlEntities(recipe.instruction));
    }
  }, [recipe]);

  const deleteRecipe = () => {
    const {
      match: {
        params: { id },
      },
    } = props;
    const url = `/api/v1/destroy/${id}`;
    const token = document.querySelector('meta[name="csrf-token"]').content;

    fetch(url, {
      method: "DELETE",
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
      .then(() => props.history.push("/recipes"))
      .catch((error) => console.log(error.message));
  };

  return (
    <div>
      <div
        className="show-recipe-image"
        style={{ backgroundImage: `url(assets/${recipe.image})` }}
      >
        <h1 className="recipe-show-name">{recipe.name}</h1>
      </div>

      <div>
        <div className="recipe-show-mid-div">
          <div className="recipe-show-ingredients-div">
            <h5 className="recipe-show-ingredients-title">Ingredients</h5>
            <ul className="ingredients-ul">{ingredientList}</ul>
          </div>

          <div>
            <h5 className="recipe-show-prep-title">Preparation Instructions</h5>
            <div
              dangerouslySetInnerHTML={{
                __html: `${recipeInstruction}`,
              }}
            />
          </div>

          {recipeOwner ? (
            <div className="recipe-show-btn-div">
              <Link
                to={`/edit_recipe/${props.match.params.id}`}
                className="recipe-show-edit-link"
              >
                Edit
              </Link>
              <button
                onClick={deleteRecipe}
                className="recipe-show-del-btn"
                type="button"
              >
                Delete
              </button>
            </div>
          ) : (
            <div></div>
          )}
        </div>

        <button
          onClick={() => props.history.goBack()}
          className="recipe-show-back-btn"
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default Recipe;
