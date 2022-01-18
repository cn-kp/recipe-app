var formEl = document.querySelector("#form-input");
var searchQuery = document.querySelector("#search-query");
var dietRequirement = document.querySelector("#diet");
var mealType = document.querySelector("#meal-type");
var searchResults = document.querySelector("#recipe-results");
var veganCheckboxEl = document.querySelector("#vegan");
var glutenFreeCheckboxEl = document.querySelector("#gluten-free");
var vegeterianCheckboxEl = document.querySelector("#vegetarian");
var dairyFreeCheckboxEl = document.querySelector("#dairy-free");

var apiID = "bf7ef27c";
var apiKey = "f26b311cc0cf67ce4f322e55dca05398";

var veganOption;
var glutenOption;
var vegetarianOption;
var dairyOption;

var formSubmitHandler = function (event) {
  event.preventDefault();

  var query = searchQuery.value;

  if (query) {
    searchAPi(query, veganOption, glutenOption, vegetarianOption, dairyOption);
  }
};

var searchAPi = function (query, vegan, glutenFree, vegetarian, dairy) {
  var apiUrl =
    "https://api.edamam.com/api/recipes/v2?" +
    "q=" +
    query +
    "&app_key=" +
    apiKey +
    "&app_id=" +
    apiID +
    "&type=public";

  //logical function to determine which API paramters to query based on user selection
  if (vegan) {
    apiUrl += "&health=" + vegan;
  }

  if (vegetarian) {
    apiUrl += "&health=" + vegetarian;
  }

  if (dairy) {
    apiUrl += "&health=" + dairy;
  }

  if (glutenFree) {
    apiUrl += "&health=" + glutenFree;
  }

  console.log(apiUrl);

  fetch(apiUrl, {
    mode: "cors",
  }).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        console.log(data);
        for (var i = 0; i < 5; i++) {
          var recipeResults = {
            label: data.hits[i].recipe.label,
            url: data.hits[i].recipe.url,
            image: data.hits[i].recipe.images.REGULAR.url,
          };
          displayResults(
            recipeResults.label,
            recipeResults.url,
            recipeResults.image
          );
        }
      });
    }
  });
};

var displayResults = function (label, url, image) {
  var cardEl = document.createElement("div");
  var cardSectionEl = document.createElement("div");
  var subtitleEl = document.createElement("h4");
  var descriptionEl = document.createElement("p");
  var linkEl = document.createElement("a");
  var cardImageEl = document.createElement("img");
  var favButton = document.createElement("i");

  cardEl.setAttribute("class", "card");
  cardSectionEl.setAttribute("class", "card-section");
  subtitleEl.textContent = label;
  cardImageEl.src = image;
  linkEl.setAttribute("href", url);
  linkEl.setAttribute("target", "_blank");
  linkEl.setAttribute("class", "card-link");
  descriptionEl.className = "description";
  favButton.setAttribute("class", "far fa-heart");

  searchResults.appendChild(cardEl);
  linkEl.appendChild(subtitleEl);
  cardEl.appendChild(cardSectionEl);
  cardSectionEl.appendChild(cardImageEl);
  cardSectionEl.appendChild(descriptionEl);
  cardSectionEl.appendChild(linkEl);
  cardSectionEl.appendChild(favButton);

  favButton.addEventListener("click", function (event) {
    event.defaultPrevented();
    var favRecipe = favButton.parentElement.h4;
    localStorage.setItem(favRecipe);

    //local
  });
};

formEl.addEventListener("submit", formSubmitHandler);

veganCheckboxEl.addEventListener("change", function () {
  if (this.checked) {
    veganOption = "vegan";
  } else {
    veganOption;
  }
});

glutenFreeCheckboxEl.addEventListener("change", function () {
  if (this.checked) {
    glutenOption = "gluten-free";
  } else {
    glutenOption;
  }
});

vegeterianCheckboxEl.addEventListener("change", function () {
  if (this.checked) {
    vegetarianOption = "vegetarian";
  } else {
    vegetarianOption;
  }
});

dairyFreeCheckboxEl.addEventListener("change", function () {
  if (this.checked) {
    dairyOption = "dairy-free";
  } else {
    dairyOption;
  }
});
// getApiData();
