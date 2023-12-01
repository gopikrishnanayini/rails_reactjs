import React, { useState } from "react";
import { Link } from "react-router-dom";

const NewRecipe = (props) => {
  const [forms, setForms] = useState({
    name: "",
    ingredients: "",
    instruction: "",
  });

  const stripHtmlEntities = (str) => {
    return String(str).replace(/</g, "&lt;").replace(/>/g, "&gt;");
  };

  const onChange = (event) => {
    const { name, value } = event.target;

    setForms({ ...forms, [name]: value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    const url = "/api/v1/recipes/create";
    const { name, ingredients, instruction } = forms;

    if (name.length == 0 || ingredients.length == 0 || instruction.length == 0)
      return;

    const body = {
      name,
      ingredients,
      instruction: instruction.replace(/\n/g, "<br> <br>"),
    };

    const token = document.querySelector('meta[name="csrf-token"]').content;

    fetch(url, {
      method: "POST",
      headers: {
        "X-CSRF-Token": token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((response) => props.history.push(`/recipe/${response.id}`))
      .catch((error) => console.log(error.message));
  };

  return (
    <div className="new-recipe-container">
      <div className="new-recipe-inner-div">
        <h1 className="new-recipe-title">
          Add a new recipe to our awesome recipe collection.
        </h1>

        <form className="new-recipe-form" onSubmit={onSubmit}>
          <label className="new-recipe-label" htmlFor="recipeName">
            <span className="new-recipe-span">Recipe name</span>
            <input
              type="text"
              name="name"
              id="recipeName"
              required
              onChange={onChange}
              className="new-recipe-text-input"
            />
          </label>

          <label className="new-recipe-label" htmlFor="recipeIngredients">
            <span className="new-recipe-span">Ingredients</span>
            <input
              type="text"
              name="ingredients"
              id="recipeIngredients"
              required
              onChange={onChange}
              className="new-recipe-text-input"
            />
            <small id="ingredientsHelp">
              Separate each ingredient with a comma.
            </small>
          </label>

          <label className="new-recipe-label" htmlFor="instruction">
            <span className="new-recipe-span">Preparation Instructions</span>
            <textarea
              id="instruction"
              name="instruction"
              rows="5"
              required
              onChange={onChange}
              className="new-recipe-text-area"
            />
          </label>

          <button type="submit" className="new-recipe-submit-btn">
            Create Recipe
          </button>
          <Link to="/recipes" className="new-recipe-back-link">
            Back to recipes
          </Link>
        </form>
      </div>
    </div>
  );
};

export default NewRecipe;
