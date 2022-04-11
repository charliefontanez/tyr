var titleEl = document.querySelector("#title");
var descriptionEl = document.querySelector("#description");
var contentContainerEl = document.querySelector("#item-description");
var game = document.location.search.split("_")[3];
var id = document.location.search.split("_")[1];
var libraryButtonEl = document.querySelector(".container").children[0];
var gameList = JSON.parse(localStorage.getItem("gameList")) || [];
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

game = replaceAllSpaceHolders(game);
titleEl.innerText = game;

for (i = 0; i < gameList.length; i++) {
  if (gameList[i] == game) {
    libraryButtonEl.textContent = "Added to list ";
    isInLibrary = true;
    libraryButtonEl.style.color = "#2d9b2d";
    break;
  }
}

var gameData;
fetch("https://api.rawg.io/api/games/" + id + "?key=1162dfcd4c004cc3adeeaa606112ab38").then(function(response) {
  if (response.ok) {
    response.json().then(function(response) {
      console.log(response);
      gameData = response;
      let frag = document.createRange().createContextualFragment(response.description);
      contentContainerEl.children[1].src = response.background_image;
      contentContainerEl.children[1].alt = game + " Image";
      console.log(frag);
      contentContainerEl.appendChild(frag);
    });
  }
  else {
    console.log("Response Error");
  }
});




var libraryButton = function() {
  console.log("click");

  if (isInLibrary == false) {
    gameList.push(game);
    window.localStorage.setItem("gameList", JSON.stringify(gameList));
    libraryButtonEl.textContent = "Added to list ";
    isInLibrary = true;
    libraryButtonEl.style.color = "#10ac84";
  }
  else {
    for (i = 0; i < gameList.length; i++) {
      if (gameList[i] == game) {
        gameList.splice(i, 1);
      }
    }
    window.localStorage.setItem("gameList", JSON.stringify(gameList));
    isInLibrary = false;
    libraryButtonEl.innerHTML = "<p>Add to List </p><i class='fa-solid fa-plus'></i>";
    libraryButtonEl.style.color = "#ffffff";
  }
}


libraryButtonEl.addEventListener("click", libraryButton);