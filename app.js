const URL = "https://www.themealdb.com/api/json/v1/1/search.php?s=";

const searchBtn = document.querySelector(".search-btn");
const placeHolderText = document.querySelector(".placeholder-text");
const recipeItem = document.querySelector(".recipe-item");


let favourite = [];
let heartClickAttached = false;

const updateItem = async (food) => {
    const recipeTitle = document.querySelector(".recipe-title");
    const recipedesc = document.querySelector(".recipe-description");
    const recipeImg = document.querySelector(".recipe-image img");
    const recipeIngredients = document.querySelector(".recipe-ingredients ul");
    const recipeItem = document.querySelector(".recipe-item");
    const placeholder = document.querySelector(".placeholder-text");
    const heart = document.querySelector(".heart-icon");

    const response = await fetch(`${URL}${food}`);
    const data = await response.json();
    const meal = data.meals[0];
    

    
    placeholder.classList.add("hide");
    recipeItem.classList.remove("hide");

    
    recipeTitle.textContent = meal.strMeal || food;
    recipeImg.src = meal.strMealThumb;
    recipedesc.textContent = meal.strInstructions || "No instructions available.";

    
    recipeIngredients.innerHTML = "";

    
    for (let i = 1; i <= 20; i++) {
        const ingredient = meal[`strIngredient${i}`];
        const measure = meal[`strMeasure${i}`];
        if (ingredient && ingredient.trim() !== "") {
            const li = document.createElement("li");
            li.textContent = `${ingredient} - ${measure}`;
            recipeIngredients.appendChild(li);
        }
    }

    heart.classList.remove("favorited");
    
    
    if (favourite.includes(meal.strMeal)) {
        heart.classList.add("favorited");
    }

    
    heart.removeEventListener("click", heartClickHandler);
    heart.addEventListener("click", heartClickHandler);
};


const heartClickHandler = (event) => {
    const currentMeal = document.querySelector(".recipe-title").textContent;
    const heart = event.target;

    if (favourite.includes(currentMeal)) {
        removeFromFav(currentMeal);
        heart.classList.remove("favorited");
    } else {
        addToFav(currentMeal);
        heart.classList.add("favorited");
    }
};



const addToFav =(meal)=>{
    if (favourite.includes(meal)) {
        return; 
    }
    
    favourite.push(meal);
    
    
    const text = document.querySelector(".placeholder-text-fav");
    if (text) {
        text.classList.add("hide");
    }
    
    const favoritesList = document.querySelector(".favorites-list");
    favoritesList.classList.remove("hide");
    
    const favItem = document.createElement("div");
    favItem.classList.add("favorite-item");
    favItem.setAttribute("data-meal", meal); 
    
    const favTitle = document.createElement("div");
    favTitle.classList.add("favorite-title");
    favTitle.innerText = meal;
    
    favItem.appendChild(favTitle);
    
    
    favItem.addEventListener("click", () => {
        updateItem(meal);
    });
    
    favoritesList.appendChild(favItem);
    
    

}

const removeFromFav = (meal) => {
    
    favourite = favourite.filter(item => item !== meal);

    
    const favoritesList = document.querySelector(".favorites-list");
    const favItems = favoritesList.querySelectorAll(".favorite-item");

    favItems.forEach(item => {
        if (item.getAttribute("data-meal") === meal) {
            favoritesList.removeChild(item);
        }
    });

    
    if (favourite.length === 0) {
        document.querySelector(".placeholder-text-fav").classList.remove("hide");
        favoritesList.classList.add("hide");
    }
};



searchBtn.addEventListener("click" , ()=>{

    const food = document.querySelector(".search-input").value.trim();
    if (food === "") return;

    updateItem(food);



    placeHolderText.classList.add("hide");
    recipeItem.classList.remove("hide");

});



