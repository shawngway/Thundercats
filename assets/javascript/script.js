$(document).ready(function () {

  // <!-- TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#config-web-app -->

  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyDUfIh4HelMGbMhdeYmKl-D97pC2jJYql0",
    authDomain: "next-game-dc90c.firebaseapp.com",
    databaseURL: "https://next-game-dc90c.firebaseio.com",
    projectId: "next-game-dc90c",
    appId: "1:446183546506:web:9105e15a8b1f86a8ac1773",
    storageBucket: "next-game-dc90c.appspot.com",
    messagingSenderId: "446183546506",
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  const auth = firebase.auth();    //firebase functions saved as variables
  const db = firebase.database();

  //global variables being changed depending on user input
  var gameInspected;
  var wishList = [];
  var JSONWishList;



  /////////////////////////////////////user authentication changes//////////////////////////////////////////////
  auth.onAuthStateChanged(user => {               //nav bar dynamically changes based on users signing in or out
    if (user) {
      console.log("user logged in: ", user)   //when user is signed in nav bar changes to this
      $("#accountNav").show();
      $("#libraryNav").show();
      $("#userLogout").show();
      $("#signInNav").hide();
      $("#signUpNav").hide();

    } else {
      console.log("user logged out")          //when user is signed out nav bar changes to this
      $("#signInNav").show();
      $("#signUpNav").show();
      $("#accountNav").hide();
      $("#libraryNav").hide();
      $("#userLogout").hide();
    }
  })



  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //global variables for games being searched
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
        $("#placeholder").css({ "display": "none" })

        for (i = 0; i < response.results.length; i++) {

          var cover = $("<img class='cover'>")

          var cover = $("<img>")
          var div = $("<div class='suggGameDiv'>")
          var li = $("<li>")


          div.attr("data-name", response.results[i].name)

          div.attr("class", 'uk-panel active')

          div.attr("data-toggle", 'modal')

          div.attr("data-target", '#gameModal')

          cover.attr("src", response.results[i].short_screenshots[0].image)


          $("#gameSugg").append(li)
          $(li).append(div)
          $(div).append(cover)



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

  // var gameImage = "picture"//cover

  // var gameTitle = "name"//game name

  // var gameRating = "rating"//game rating

  // var gameBox = $("<img>").addClass("gamebox");


  // Example queryURL for Giphy API
  // var queryURL = "https://api.giphy.com/v1/gifs/trending?api_key=BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9";
  var tool = "test";
  var queryURL = "https://cors-anywhere.herokuapp.com/https://api-v3.igdb.com/games/";

  function gameSearch() {
    $("#wishListError").html("");
    console.log($(this).attr("data-name"));
    var metaName = $(this).attr("data-name");
    gameInspected = $(this).attr("data-name")
    console.log(gameInspected);
    $("#wishlistButton").removeAttr("id");
    $("#wishlistButton").attr("id", gameInspected);
    $.ajax({
      url: queryURL,
      method: "POST",
      headers: {
        "user-key": "d61ece206f9dedf20a9aa373ffa29739"
      },
      data: 'search ' + ' " ' + metaName + ' " ' + '; fields *;'
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
          $("#gameInfo").html(`<li>${game[0].name}</li>`)
          $("#gameInfo").append("<li><a href='" + game[0].url + "'>Game Info</a></li>")

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

  //////////////////////////////////////<modals> and signing in/out////////////////////////////////////////////////////////

  //getting users signed up
  $("#signUpButton").on("click", function (event) {
    event.preventDefault()
    var userPassword = $("#signUpInputPassword1").val().trim();   //saving user's password and email as a variable
    var userEmail = $("#signUpInputEmail1").val().trim();
    if (userEmail !== "" && userPassword !== "") {              //if passwords aren't blank and are valid
      $("#signUpError").html("")
      auth.createUserWithEmailAndPassword(userEmail, userPassword).then(cred => { //create the user in the database with the username and password equal to what the user input was
        $("#closeSignUp").click();
        $("#signUpInputPassword1").val("");       //closes and resets the fields in the sign up modal
        $("#signUpInputEmail1").val("");

      });


    }
    else $("#signUpError").html("One or more fields are invalid").css({ "color": "red" })   //if input is messed up red words saying input values are invalid comes up
  });

  //letting users sign in if not already
  $("#logInButton").on("click", function (event) {
    var email = $("#signInInputEmail1").val().trim();
    var password = $("#signInInputPassword1").val().trim();
    event.preventDefault();

    auth.signInWithEmailAndPassword(email, password).then(cred => {
      console.log(cred.user)

      $("#logInClose").click();
      $("#signInInputPassword1").val("");       //closes and resets the fields in the sign in modal
      $("#signInInputEmail1").val("");
    })

  });

  //users can sign out
  $("#userLogout").on("click", function (event) {
    auth.signOut();
  });

  $("#libraryNav").on("click", function (event){
    $("#accordion").empty();
    for(var i = 0; i < wishList.length; i++){         //for each set of items in the wishlist array creates a collapsable bootstrap folder to hold data
      var card = $("<div>").attr("class", "card");
      var cardHead = $("<div>").attr({"class":"card-head", "id":"heading" + (i+1),});
      card.append(cardHead);
      var h5 = $("<h5>").attr("class", "mb-0");             //makes a button with the contents equal to the index array that its grabbing the info from
      cardHead.append(h5);
      h5.append("<button>" + wishList[i] +"</button>").attr({"class":"btn btn-link", "data-toggle": "collapse", "data-target":"#collapse" + (i+1), "aria-expanded":"true", "aria-controls": "collapse" + (i+1)});
      var collapse = $("<div>").attr({"id":"collapse" + (i+1), "class": "collapse", "aria-labelledby": "heading" + (i+1), "data-parent":"#accordion"});
      var cardBody = $("<div>").attr("class", "card-body");
      card.append(collapse);
      collapse.append(cardBody);
      $("#accordion").append(card);
    }
  });


  //game wishlist being populated
  $("#wishlistButton").on("click", function (event) {
    event.preventDefault();
    $("#wishListError").html("")
    console.log(gameInspected);
    var contains = wishList.includes(gameInspected)   //checks if the game is already in their wishlist
    console.log(wishList.length);
    if (contains === true) {                          //if its in there an error message comes up
      $("#wishListError").html("This game is already in your wishlist.").css({ "color": "red", "display": "block" });
      return;
    } else if (contains === false) {                  //if it isn't in there it adds the game to the wishlist
      wishList.push(gameInspected);
      JSONWishList = JSON.stringify(wishList);        //then sets the new wishlist as the local storage
      localStorage.setItem('wishList', JSONWishList);
      console.log(JSONWishList);
      console.log(JSON.parse(localStorage['wishList']))

    }
    console.log(wishList);


  })

  ///////////////////////////////////////</modals>////////////////////////////////////////////////////////////////


  //runs when the page is loaded. populates the wishList with the stored local data
  function localDataPopulatingWishList() {
    wishList = JSON.parse(localStorage['wishList'])
    console.log(wishList);
  }

  localDataPopulatingWishList();

  $(document).on("click", ".uk-panel", gameSearch);
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


  // var gameBox = $("<img>").addClass("gamebox");

  // var gameBox = $("<img>").addClass("gamebox")

  // var gameBox = $("<img>").addClass("gamebox");


});