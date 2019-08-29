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