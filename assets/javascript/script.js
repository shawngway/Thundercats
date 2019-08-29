<<<<<<< HEAD
var search = function() {
   
    event.preventDefault()

    var gameTitleInput = $("#gameInput").val()

    console.log(gameTitleInput)

    $("#gameInput").val("")

}

//after ajax call

//I want to make this an object

var gameImage = "picture"//cover

var gameTitle = "name"//game name

var gameRating = "rating"//game rating

var gameTrailer = "trailer" //gameplay video or something

var gameBox = $("<img>").addClass("gamebox"); //give gamebox a css width/height ---TODO

gameBox.attr("src", gameImage) //gives the image it's source

gameBox.attr("data-title", gameTitle) //stores the title
gameBox.attr("data-rating", gameRating) //stores the rating
gameBox.attr("data-trailer", gameTrailer) //stores the trailer source

$("#").append(gameBox) //appends 







//ends appends to game area

$(document).on("click", "#search", search) //on click of the sumbit button, calls the search function

$(document).on("click", ".gamebox" gameQuery) //on click of each game (does not exist yet)
=======
// Example queryURL for Giphy API
    // var queryURL = "https://api.giphy.com/v1/gifs/trending?api_key=BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9";
    var queryURL = "https://cors-anywhere.herokuapp.com/https://api-v3.igdb.com/games/";
​
    $.ajax({
      url: queryURL,
      method: "POST",
      headers: {
        "user-key": "d61ece206f9dedf20a9aa373ffa29739"
      },
      data: "fields *; where id = 104945;"
    }).then(function(response) {
      console.log(response);
    }).fail(function(jqXHR, textStatus) { 
      console.error(textStatus)
    });
>>>>>>> 0aa84df1163437b9534fc056f76d2b3531841483
