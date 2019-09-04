//global variables
var gameTitleInput;
var genreBeingSearched;

var search = function() {
   
    event.preventDefault()

    var gameTitleInput = $("#gameInput").val()

    console.log(gameTitleInput)

    $("#gameInput").val("")

}

$("#submitButton").on("click", function (e) {
  event.preventDefault();
  if (($("#gameInput").val().trim() !== "")) {
      gameTitleInput = $("#gameInput").val().trim();
      console.log(gameTitleInput)
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

//appends divs to game area

var gameImage = "picture"//cover

var gameTitle = "name"//game name

var gameRating = "rating"//game rating

var gameBox = $("<img>").addClass("gamebox");


// Example queryURL for Giphy API
    // var queryURL = "https://api.giphy.com/v1/gifs/trending?api_key=BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9";
    var queryURL = "https://cors-anywhere.herokuapp.com/https://api-v3.igdb.com/games/";
    $.ajax({
      url: queryURL,
      method: "POST",
      headers: {
        "user-key": "d61ece206f9dedf20a9aa373ffa29739"
      },
      data: "fields *; where id = 104945;"
    }).then(function(response) {
      console.log(response);
      var title = response[0].name
      console.log(title)
      $("#exampleModalLabel").append(title + " Info")
    }).fail(function(jqXHR, textStatus) { 
      console.error(textStatus)
    });


//ends appends to game area

$(document).on("click", "#search", search) //on click of the sumbit button, calls the search function
