var movie = document.location.search.split("=")[1];
console.log(movie);

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

console.log(movie);

document.querySelector("#title").textContent = movie;