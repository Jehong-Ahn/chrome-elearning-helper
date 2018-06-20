
var rooms = document.getElementsByClassName("summuryArea");

for(var i = 0; i < rooms.length; i++) {
  rooms[i].addEventListener("click", ()=>{

    var btnStyle = "border: 1px solid silver; padding: 1px 3px;"

    setTimeout(()=>{
      var buttons = document.getElementsByTagName("button")
      for (var i = 0; i < buttons.length; i++) { 
        
        var btn = buttons[i]
        
        if (btn.getAttribute("title")!="학습하기") continue
        
        btn.textContent = "수강"
        btn.setAttribute("title", "")
        btn.style = btnStyle
        
        var newBtn = document.createElement("button")
        newBtn.textContent = "자동"
        newBtn.style = btnStyle

        newBtn.addEventListener("click", (event)=>{
          
          event.preventDefault()
          
          var form = event.target.closest("form")
          var lectureOpenSeq = form.querySelector("input[name=lectureOpenSeq]").value
          var contentsCode = form.querySelector("input[name=contentsCode]").value
          var chapter = event.target.closest("tr").querySelector("td")
            .textContent.replace("차시", "")
          
          var request1 = new Request("http://cont1.tok2.kr/api/apiProgressCheck.php", {
            method: "POST",
            body: "lectureOpenSeq="+lectureOpenSeq
              +"&contentsCode="+contentsCode
              +"&chapter="+chapter
              +"&nowPage=1&totalTime=30000&progressCheck=",
            mode: "cors",
            credentials: "include",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
            },
          })

          var request2 = request1.clone()

          fetch(request1)
          .then(() => fetch(request2))
          .then(response => response.json())
          .then(json => {
            if (json.result=="success") {
              event.target.closest("tr").querySelector("td:nth-child(3)")
                .textContent = "100%"
            }
            else {
              alert(json.result)
            }
          })
        })

        btn.after(newBtn)
      }
    }, 1000)

  })
}
