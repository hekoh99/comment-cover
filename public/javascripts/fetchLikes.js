function fetchLikes(commentID){
  fetch('/html/likes.html').then(function(response){response.text().then(function(text){document.getElementById('countL').innerHTML = text + 1;})})
}
