// Define variables
const ginBtn = document.getElementById('gin-btn');
const vodkaBtn = document.getElementById('vodka-btn');
const whiskeyBtn = document.getElementById('whiskey-btn');
const cocktailUl = document.getElementById('cocktail-ul');
const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');

// Define event listeners for alcohol type buttons
ginBtn.addEventListener('click', () => {
getCocktails('gin');
});

vodkaBtn.addEventListener('click', () => {
getCocktails('vodka');
});

whiskeyBtn.addEventListener('click', () => {
getCocktails('whiskey');
});

// Define event listener for search form
searchForm.addEventListener('submit', (e) => {
e.preventDefault();
const searchTerm = searchInput.value.trim();
if (searchTerm) {
getCocktails(searchTerm);
searchInput.value = '';
}
});

// Function to get cocktails based on alcohol type or search term
async function getCocktails(searchTerm) {
// Clear previous cocktail list
cocktailUl.innerHTML = '';

try {
// Make API request using fetch
const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchTerm}`);
const data = await response.json();
const cocktails = data.drinks;

if (cocktails) {
  // Loop through cocktails and display them
  cocktails.forEach((cocktail) => {
    const cocktailLi = document.createElement('li');
    cocktailLi.classList.add('cocktail-li');

    const cocktailImg = document.createElement('img');
    cocktailImg.classList.add('cocktail-img');
    cocktailImg.src = cocktail.strDrinkThumb;
    cocktailImg.alt = cocktail.strDrink;

    const cocktailName = document.createElement('h3');
    cocktailName.classList.add('cocktail-name');
    cocktailName.textContent = cocktail.strDrink;
    
    //ingredients
    let ingredientsList = [];
    for (let i = 1; i <= 15; i++) {
      if (cocktail[`strIngredient${i}`]) {
        ingredientsList.push(cocktail[`strIngredient${i}`]);
      }
    }
    let ingredientLi = document.createElement('p');
    ingredientLi.classList.add('ingredient-li');
    let ingredientsContent = ingredientsList.join(', ');
    ingredientLi.textContent = ingredientsContent;
    cocktailLi.appendChild(cocktailImg);
    cocktailLi.appendChild(cocktailName);
    cocktailLi.appendChild(ingredientLi);
    cocktailLi.addEventListener('click', function() {
      if (ingredientLi.classList.contains('show')) {
        ingredientLi.classList.remove('show');
      } else {
        ingredientLi.classList.add('show');
      }
    }, false);

    cocktailUl.appendChild(cocktailLi);
  });
} else {
  // No cocktails found
  const noCocktailsLi = document.createElement('li');
  noCocktailsLi.textContent = 'No cocktails found.';
  cocktailUl.appendChild(noCocktailsLi);
}
} catch {
// Error getting cocktails
const errorLi = document.createElement('li');
errorLi.textContent = 'Error getting cocktails.';
cocktailUl.appendChild(errorLi);
}
}