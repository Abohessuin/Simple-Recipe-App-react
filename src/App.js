import React, { useEffect, useState } from 'react';
import Recipe from "./Recipe"
import './App.css';



const App = () => {

  const APP_ID = 'b5bd2054';
  const APP_KEY = 'ffef717b3c7f23ec36a816946c741eb6';

  const [recipes, setRecipes] = useState([]);
  const [search,setSearch]=useState('');
  const [query,setQuery]=useState('chicken');


  useEffect(() => {
    getRecipes();
    //getsearch();
  },[query]);


  const getRecipes = async () => {
    const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`);
    const data = await response.json();
    setRecipes(data.hits);

  }

  const updateSearch= e=>{
       setSearch(e.target.value);
       console.log(search);
  }
  const getSearch= e=>{
    e.preventDefault();
    setQuery(search);
    setSearch("");
  }
 
  return (


    <div className="App">
      
      <form className="search-form" onSubmit={getSearch}>
        <input className="search-bar" type="text" value={search} onChange={updateSearch} />
        <button className="search-button" type="submit" >Search</button>
      </form>
      <div className="recipes">
      {
        recipes.map((recipe) => (
          <Recipe
            key={recipe.recipe.label}
            title={recipe.recipe.label}
            calories={recipe.recipe.calories}
            image={recipe.recipe.image}
            ingredients={recipe.recipe.ingredients}
          />
        ))


      }
      </div>
     </div>

  );


};


export default App;
