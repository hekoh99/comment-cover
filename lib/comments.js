exports.coList = function(comments, is_login){
  var i = 0;
  var owner;
  var content;
  var like;
  var dislike;
  var coList = '';
  while(i<comments.length){
    owner = comments[i].wrote_by;
    content = comments[i].content;
    like = comments[i].likes;
    dislike = comments[i].dislikes;
    coList = coList + `
    <li><div id="words">${content}</div>| <div id="writer">by ${owner}</div>|| <a href="javascript:updateLikes(${comments[i].id})" onclick="if(${is_login} === false){alert('login required');return false;} else{return true;}">좋아요</a>: <span id="${comments[i].id}">${like}</span> || <a href="javascript:updateDlikes(${comments[i].id})" onclick="if(${is_login} === false){alert('login required');return false;} else{return true;}">싫어요</a> : <span id="-${comments[i].id}">${dislike}</span></li>
    `;
    i++;
  }
  return coList;
}
