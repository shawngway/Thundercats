$(document).ready(function () {
  //global variables
  var gameTitleInput;
  var genreBeingSearched;


  $("#submitButton").on("click", function (event) { //whenever the submit button is clicked
    event.preventDefault()
    gameTitleInput = $("#gameInput").val().trim().replace(/\s/g, '-'); //sets gameTitleInput to text input
    $("#gameInput").val("")
    if ((gameTitleInput !== "")) { //if gameTitleInput is not null

      $("#invalidTitle").css({ "display": "none" }) //error message is not there

      //API

      var queryURL = "https://api.rawg.io/api/games/" + gameTitleInput + "/suggested?page_size=5"

      $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function (response) {

        console.log(response.results)

        for (i = 0; i < response.results.length; i++) {

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
    else $("#invalidTitle").css({ "display": "block", "color": "red", "margin-top": "10px" });       //error message appears if form isn't filled out properly

  })










  $(".genre-buttons").on("click", "button", function () { //whenever a genre button is clicked
    console.log("chicken")
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
      data: 'search "halo 2"; fields *;'
      //where rating > 99;fields name, category, cover, platforms, videos; limit 4; 
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
      // for (var i = 0; i < response.length; i++) {
      // }
      gameById(response[0].id)
        .then(function (game) {
          $("body").append(`<li>${game[0].name}</li>`)
          $("body").append(`<li>${game[0].url}</li>`)

          console.log(game)
        })

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

  $(document).on("click", ".cover", gameSearch);
  // console.log(tool);
  // // var queryURL = "https://api.giphy.com/v1/gifs/trending?api_key=BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9";
  // var queryURL = "https://cors-anywhere.herokuapp.com/https://api-v3.igdb.com/games/";
  // $.ajax({
  //   url: queryURL,
  //   method: "POST",
  //   headers: {
  //     "user-key": "d61ece206f9dedf20a9aa373ffa29739"
  //   },
  //   data: "fields *; where id = 104945;"
  // }).then(function (response) {
  //   console.log(response);
  //   var title = response[0].name
  //   console.log(title)
  //   $("#exampleModalLabel").append(title + " Info")
  // }).fail(function (jqXHR, textStatus) {
  //   console.error(textStatus)
  // });


  // ends appends to game area

//on click of the sumbit button, calls the search function
// var gameImage = "picture"//cover

// var gameTitle = "name"//game name

// var gameRating = "rating"//game rating

// var gameBox = $("<img>").addClass("gamebox")
});