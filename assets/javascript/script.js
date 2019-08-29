var search = function() {
   
    event.preventDefault()

    var gameTitleInput = $("#gameInput").val()

    console.log(gameTitleInput)

    $("#gameInput").val("")

}

//appends divs to game area

var gameImage = "picture"//cover

var gameTitle = "name"//game name

var gameRating = "rating"//game rating

var gameBox = $("<img>").addClass("gamebox");





//ends appends to game area

$(document).on("click", "#search", search) //on click of the sumbit button, calls the search function