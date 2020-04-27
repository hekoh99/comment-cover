function coControler(mode){
  if(mode == "전체 댓글"){
    fetch('html/comments.html').then(function(response){
      response.text().then(function(text){
        document.getElementById('comments').innerHTML = text
      })})
      document.getElementById('showComment').value = "추천 댓글"
  }
  else if(mode == "추천 댓글"){
    document.getElementById('showComment').value = "전체 댓글"
    fetch('html/goodComments.html').then(function(response){response.text().then(function(text){document.getElementById('comments').innerHTML = text;})})
  }
}
