$(document).ready(function () {
//global variables
var gameTitleInput;
var genreBeingSearched;

$("#submitButton").on("click", function (e) {
  event.preventDefault();
  if (($("#gameInput").val().trim() !== "")) {
      gameTitleInput = $("#gameInput").val().trim();
      console.log(gameTitleInput)


    //ajax call referencing title to get id number to get object



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
var tool = "test";
var queryURL = "https://cors-anywhere.herokuapp.com/https://api-v3.igdb.com/games/";

function gameSearch() {
  $.ajax({
    url: queryURL,
    method: "POST",
    headers: {
      "user-key": "d61ece206f9dedf20a9aa373ffa29739"
    },
    data: "where rating > 98;"
  }).then(function (response) {
    // $.ajax({
    //   url: queryURL,
    //   method: "POST",
    //   headers: {
    //     "user-key": "d61ece206f9dedf20a9aa373ffa29739"
    //   },
    //   data: "fields *; where id = " + response[0].id + ";"
    // }).then(function (pickles){
    //   console.log(pickles)
    // });
    
    for (var i = 0; i < response.length; i++) {
      gameById(response[i].id)
      .then (function (game) {
        $("body").append(`<p>${game[0].name}</p>`)
        console.log(game)
      })
    }

    console.log(response);
    console.log(response[0]);
  }).fail(function (jqXHR, textStatus) {
    console.error(textStatus)
  });
};

function gameById(id) {
  return $.ajax({
    url: queryURL,
    method: "POST",
    headers: {
      "user-key": "d61ece206f9dedf20a9aa373ffa29739"
    },
    data: "fields *; where id = " + id + ";"
  })
}

$(document).on("click", "button", gameSearch);
console.log(tool);

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

  })
