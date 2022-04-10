var searchEl = document.querySelector("form");
var searchResults = document.querySelector(".search-results");
var searchInput = "";

var data;


var getGameData = function(game) {
  var apiUrl = "https://api.rawg.io/api/games?search=" + game + "&key=1162dfcd4c004cc3adeeaa606112ab38";
  fetch(apiUrl).then(function(response) {
    if (response.ok) {
      response.json().then(function(response) {
        console.log(response);
        showResults(response);
      });
    }
    else {
      console.log("Bad response found");
    }
  });
}

var getMovieData = function(movie) {
  movie = movie.trim();

  fetch("https://api.themoviedb.org/3/search/movie?api_key=ad632fafb63b4f5e153703fe70e7b5e4&query=" + movie)
  .then(function(response) {
    if (response.ok) {
    response.json().then(function(response) {
      console.log(response);
      showResults(response);
    });
  }
  else {
    console.log("Bad response found");
  }
  });
};

var showResults = function(response) {
  
  // document.querySelectorAll(".result-item");
  
  removeAllChildren(searchResults);

  if (searchEl.id == "game-search-form") {
    for (i = 0; i < response.results.length; i++) {
      var searchItem = document.createElement("div");
      searchItem.addEventListener("click", itemClickHandler);
      searchItem.id = "result-" + i;
      searchItem.className = "result-item";
      searchItem.textContent = response.results[i].name;
      searchResults.appendChild(searchItem);
    }
  }
  else {
    for (i = 0; i < response.results.length; i++) {
      var searchItem = document.createElement("div");
      searchItem.addEventListener("click", itemClickHandler);
      searchItem.id = "result-" + i;
      searchItem.className = "result-item";
      searchItem.textContent = response.results[i].title;
      searchResults.appendChild(searchItem);
    }
  }
}


var itemClickHandler = function () {
  removeAllChildren(searchResults);
  console.log("Item Clicked");
  document.querySelector("#item-description").classList.remove("hide");
  document.querySelector("#item-description").classList.add("show");
}


var removeAllChildren = function(container) {
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }
}


// Search box event listener
searchEl.addEventListener("submit", function(e) {
  e.preventDefault();
  searchInput = document.querySelector("#search").value.trim();
  
  if (searchEl.id == "game-search-form") {
    getGameData(searchInput);
    $("#search").val("");
  }
  else if (searchEl.id == "movie-search-form") {
    getMovieData(searchInput);
    searchEl.children[0].value = "";
  }

});

// Button to switch results from movie to games
$("#apiSwitch").on("click", function() {
  if (searchEl.id == "game-search-form") {
    $(searchEl).attr("id", "movie-search-form");
    $("#search").attr("placeholder", "Search Movies and Tv Shows");
    console.log(searchEl);
  }
  else if (searchEl.id == "movie-search-form") {
    $(searchEl).attr("id", "game-search-form");
    $("#search").attr("placeholder", "Search Games");
    console.log(searchEl);
  }
})
