<<<<<<< HEAD
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
