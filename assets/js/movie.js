var movie = document.location.search.split("=")[1];

var titleEl = document.querySelector("#title");
var descriptionEl = document.querySelector("#description");
var contentContainerEl = document.querySelector("#item-description");
var libraryButtonEl = document.querySelector(".container").children[0];
var contentList = JSON.parse(localStorage.getItem("contentList")) || [];
var isInLibrary = false;


var replaceAllSpaceHolders = function(string) {
  string = string.split('');

  for (i = 0; i < string.length; i++) {
    if (string[i] == '%') {
      string.splice(i, 3, ' ');
    }
    else {
      continue;
    }
  }

return string.join("");
}

movie = replaceAllSpaceHolders(movie);
titleEl.innerText = movie;
console.log(movie);


for (i = 0; i < contentList.length; i++) {
  if (contentList[i] == movie) {
    libraryButtonEl.textContent = "Added to list ";
    isInLibrary = true;
    libraryButtonEl.style.color = "#2d9b2d";
    break;
  }
}


var movieData;
fetch( "https://api.themoviedb.org/3/search/movie?query=" + movie + "&api_key=ad632fafb63b4f5e153703fe70e7b5e4&language=en-US&page=1&include_adult=false").then(function(response) {
  if (response.ok) {
    response.json().then(function(response) {
      console.log(response);
      movieData = response;
      let frag = document.createRange().createContextualFragment("<p>" + response.results[0].overview + "</p>");
      console.log(frag);
      contentContainerEl.appendChild(frag);
      // contentContainerEl.children[1].src = "https://www.themoviedb.org/t/p/w600_and_h900_bestv2" + response.results[i].poster_image;
      contentContainerEl.children[1].alt = movie + " Image";
    });
  }
  else {
    console.log("Response Error");
  }
});


var libraryButton = function() {
  console.log("click");

  if (isInLibrary == false) {
    contentList.push(movie);
    window.localStorage.setItem("contentList", JSON.stringify(contentList));
    libraryButtonEl.textContent = "Added to list ";
    isInLibrary = true;
    libraryButtonEl.style.color = "#10ac84";
  }
  else {
    for (i = 0; i < contentList.length; i++) {
      if (contentList[i] == movie) {
        contentList.splice(i, 1);
      }
    }
    window.localStorage.setItem("contentList", JSON.stringify(contentList));
    isInLibrary = false;
    libraryButtonEl.innerHTML = "<p>Add to List </p><i class='fa-solid fa-plus'></i>";
    libraryButtonEl.style.color = "#ffffff";
  }
}

libraryButtonEl.addEventListener("click", libraryButton);