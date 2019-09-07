$(document).ready(function () {
//global variables
var gameTitleInput;
var genreBeingSearched;

$("#submitButton").on("click", function (e) {
  event.preventDefault();

  if (($("#gameInput").val().trim() !== "")) {
      gameTitleInput = $("#gameInput").val().trim().replace(/\s/g, '-');
      console.log(gameTitleInput)


    // var queryURL = "https://api.giphy.com/v1/gifs/trending?api_key=BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9";
    var queryURL = "https://api.rawg.io/api/games/" + gameTitleInput + "/suggested?page_size=5";
    $.ajax({
      url: queryURL,
      method: "GET"
    })
      // After data comes back from the request
      .then(function (response) {
          console.log(response)
      })



      $("#invalidTitle").css({"display" : "none"})
      
  }
  else $("#invalidTitle").css({"display": "block", "color": "red", "margin-top" : "10px"});       //error message appears if form isn't filled out properly

})

$(".genre-buttons").on("click", "button", function (event){
  console.log("chicken")
  console.log(this)
  genreBeingSearched = this.id

  console.log(genreBeingSearched)
})


//ends appends to game area

  })
