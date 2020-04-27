function updateDlikes(commentID){
  $.ajax({

				type:"post",

				url:"/modify/dislike_process",

				dataType:"json",

        data: { target : commentID },

				success:function(response) {
          if(response.answer){
            alert(response.answer);
          }
          else{
            document.getElementById("-"+commentID).innerText = response.dislikes;
          }

			},
      error: function(request, status, error){ // 통신 실패시 - 로그인 페이지 리다이렉트
          alert("로그인이 필요합니다." + error)

           window.location.replace("/")
          // alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
        },
    });
}
