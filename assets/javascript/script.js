$(document).ready(function () {
//global variables
var gameTitleInput;
var genreBeingSearched;


$("#submitButton").on("click", function (event) { //whenever the submit button is clicked
  event.preventDefault()
  gameTitleInput = $("#gameInput").val().trim().replace(/\s/g,'-'); //sets gameTitleInput to text input
  $("#gameInput").val("")
  if ((gameTitleInput !== "")) { //if gameTitleInput is not null

      $("#invalidTitle").css({"display" : "none"}) //error message is not there

      //API

      var queryURL = "https://api.rawg.io/api/games/" + gameTitleInput + "/suggested?page_size=5"

    $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function(response) {

        console.log(response.results)

        for (i=0; i<response.results.length; i++) {

          console.log(response.results[i].name)

        var cover = $("<img>")

        cover.attr("class", 'uk-panel')

        cover.attr("data-toggle", 'modal')

        cover.attr("data-target", '#gameModal')

        cover.attr("src", response.results[i].short_screenshots[0].image)

        $("#gameSugg").append("<li>").append("<div>").append(cover)

        }
      })
      
      //appending div to the output
  }
  else $("#invalidTitle").css({"display": "block", "color": "red", "margin-top" : "10px"});       //error message appears if form isn't filled out properly

})










$(".genre-buttons").on("click", "button", function (){ //whenever a genre button is clicked
  console.log("chicken")
  genreBeingSearched = this.id

  console.log(genreBeingSearched)
})

//appends divs to game area

// var gameImage = "picture"//cover

// var gameTitle = "name"//game name

// var gameRating = "rating"//game rating

// var gameBox = $("<img>").addClass("gamebox");
});