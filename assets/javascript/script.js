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
  var wishList = [""];
  var JSONWishList;
  var gamesDeleted = 0;
  var metaName



  /////////////////////////////////////user authentication changes//////////////////////////////////////////////
  auth.onAuthStateChanged(user => {               //nav bar dynamically changes based on users signing in or out
    if (user) {
      console.log("user logged in: ", user)   //when user is signed in nav bar changes to this
      $("#accountNav").show();
      $("#libraryNav").show();
      $("#userLogout").show();
      $("#signInNav").hide();
      $("#signUpNav").hide();
      $("#userEmail").html(user.email);
      $("#userSince").html(user.metadata.creationTime);


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



  $("#submitButton").on("click", function (event) { //whenever the submit button is clicked
    event.preventDefault();

    var specificSearchGameTitleInput = $("#gameInput").val().trim();

    gameTitleInput = $("#gameInput").val().trim().replace(/\s/g, '-'); //sets gameTitleInput to text input
    $("#gameInput").val("")


    if ($('#similarSearch').is(':checked')) {
      if ((gameTitleInput !== "")) { //if gameTitleInput is not null

        $("#invalidTitle").css({ "display": "none" }) //error message is not there

        //API

        var queryURL = "https://api.rawg.io/api/games/" + gameTitleInput + "/suggested?page_size=5" //url for rawg, finding games similar to the gameTitleInput and giving (currently 5) results
        console.log("about to make call")
        $.ajax({ //ajax call
          url: queryURL,
          method: "GET"

        }).then(function (response) {
          console.log("call going through")
          console.log(response.results)
          $("#placeholder").css({ "display": "none" })

          $("#gameSugg").html("")

          for (i = 0; i < response.results.length; i++) { //for each result, (currently 5)

            var cover = $("<img class='cover'>") //creates an image and assigns it the class 'cover', and sets it equal to the variable 'cover'
            var div = $("<div class='suggGameDiv'>") //creates a div and assigns it the class 'suggGameDiv' , and sets it equal to the variable 'div' (how creative of us)
            var li = $("<li>") //creates a list and sets it equal to the variable 'li'

            var mmmmmh = response.results[i].name.replace(/\s/g + '-' + /\s/g, '-').replace(":", "")
            console.log(mmmmmh)
            div.attr("data-name", mmmmmh) //the data-name of div is set to the name of the game chosen

            div.attr("class", 'uk-panel active') //the classes of div are set to uk-panel and active

            div.attr("data-toggle", 'modal') //the data-toggle of div is set to 'modal'

            div.attr("data-target", '#gameModal') //the data-target of div is set to '#gameModal'

            cover.attr("src", response.results[i].short_screenshots[0].image) //the source of the <img> cover is set to the first screenshot for each game.


            $("#gameSugg").append(li)
            $(li).append(div)
            $(div).append(cover)



          }
        })

        //appending div to the output
      }
      else $("#invalidTitle").css({ "display": "block", "color": "red", "margin-top": "10px" });       //error message appears if form isn't filled out properly
    }

    if ($('#specificSearch').is(':checked')) {
      var queryURL = "https://cors-anywhere.herokuapp.com/https://api-v3.igdb.com/games/";

      function specificGameSearch() {
        console.log("works");
        $("#wishListError").html("");
        metaName = specificSearchGameTitleInput;
        console.log(metaName);
        gameInspected = metaName.replace(/\s/g + '-' + /\s/g, '-');
        console.log(gameInspected);
        $("#wishlistButton").removeAttr("id");
        $("#wishlistButton").attr("id", metaName);
        console.log("this is being read")
        $.ajax({
          url: queryURL,
          method: "POST",
          headers: {
            "user-key": "d61ece206f9dedf20a9aa373ffa29739"
          },
          data: 'search ' + ' " ' + metaName + ' " ' + '; fields *;'
          //where rating > 99;fields name, category, cover, platforms, videos; limit 4; 
        }).then(function (response) {
          console.log(response)
          gameById(response[0].id)
            .then(function (game) {
              console.log("trying to do something with response");
              console.log("game name: " + game[0].name)
              $("#gameModal").modal("toggle")
              $("#gameModalHeader").html(`<h1>${game[0].name}</h1>`)
              $("#gameInfo").html("<p> " + game[0].summary + "</p>")
              $("#gameInfo").append("<p> Rating: " + game[0].rating + "</p>")
              $("#gameInfo").append("<p><a href='" + game[0].url + "'  target='blank'>Go to IGDB for more Info</a></p>")
              console.log(game)
            })

          console.log(response);
          console.log(response[0]);
        }).fail(function (jqXHR, textStatus) {
          console.error(textStatus)
        });
      }
      specificGameSearch();
    }

  })


  // Example queryURL for Giphy API
  // var queryURL = "https://api.giphy.com/v1/gifs/trending?api_key=BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9";
  var tool = "test";
  var queryURL = "https://cors-anywhere.herokuapp.com/https://api-v3.igdb.com/games/";

  function gameSearch() {
    console.log("works");
    $("#wishListError").html("");
    console.log($(this).attr("data-name"));
    metaName = $(this).attr("data-name"); //no hyphens
    console.log($(this).attr("data-name"))
    console.log(metaName);
    gameInspected = metaName
    console.log(gameInspected);
    $("#wishlistButton").removeAttr("id");
    $("#wishlistButton").attr("id", metaName);
    $.ajax({
      url: queryURL,
      method: "POST",
      headers: {
        "user-key": "d61ece206f9dedf20a9aa373ffa29739"
      },
      data: 'search ' + ' " ' + metaName + ' " ' + '; fields *;'
      //where rating > 99;fields name, category, cover, platforms, videos; limit 4; 
    }).then(function (response) {
      console.log(response)
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
          gameInspected = game[0].name.replace(":", "");
          console.log(gameInspected)
          console.log("trying to do something with response");
          $("#gameModal").val("")
          $("#gameModalHeader").html(`<h1>${game[0].name}</h1>`)
          $("#gameInfo").html("<p> " + game[0].summary + "</p>")
          $("#gameInfo").append("<p> Rating: " + game[0].rating + "</p>")
          $("#gameInfo").append("<p><a href='" + game[0].url + "'  target='blank'>Go to IGDB for more Info</a></p>")
          console.log(game)
        })

      console.log(response);
      console.log(response[0]);
    }).fail(function (jqXHR, textStatus) {
      console.error(textStatus)
    });
  };

  $(document).on("click", ".uk-panel", gameSearch);

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

  function populateWishList() {
    $("#accordion").empty();
    for (var i = 1; i < wishList.length; i++) {         //for each set of items in the wishlist array creates a collapsable bootstrap folder to hold data
      var card = $("<div>").attr("class", "card");
      var cardHead = $("<div>").attr({ "class": "card-head", "id": "heading cardHead" + (i + 1), });
      card.append(cardHead);             //makes a button with the contents equal to the index array that its grabbing the info from
      var button = $("<button>").attr({ "class": "btn btn-dark btn-sm m-1", "data-toggle": "collapse", "data-target": "#collapse" + (i + 1), "aria-expanded": "true", "aria-controls": "collapse" + (i + 1), "id": wishList[i].replace(/\s/g, '-') });
      button.append(wishList[i]);
      cardHead.append(button);
      var collapse = $("<div>").attr({ "id": "collapse" + (i + 1), "class": "collapse", "aria-labelledby": "heading" + (i + 1), "data-parent": "#accordion" });
      var cardBody = $("<div>").attr({ "class": "card-body", "id": "cardBody" + wishList[i].replace(/\s/g, '-') });
      card.append(collapse);
      collapse.append(cardBody);
      $("#accordion").append(card);
      var exit = $("<button>").attr({ "type": "button", "class": "close", "class": "close", "data-name": wishList[i], "aria-label": "Close", "id": "deleteWishListButton" });
      exit.append("<span id='" + wishList[i] + "' data-toggle='modal' data-target='deleteWishListModal' class='span'>&times;</span>");
      cardHead.append(exit);
      // <button type="button" class="close" data-dismiss="modal" aria-label="Close" id="">
      //<span aria-hidden="true">&times;</span>
      //</button>
    }
  }

  $("#libraryNav").on("click", function (event) {


    populateWishList()

  });

  $("#accordion").on("click", "span", function (event) {
    console.log(this.id);
    for (var i = 0; i < wishList.length; i++) {
      if (this.id === wishList[i]) {
        wishList.splice(i, 1);
      }
    }
    populateWishList();
    gamesDeleted++;
    JSONDeletedWishListItems = JSON.stringify(gamesDeleted);
    localStorage.setItem('deletedWishList', JSONDeletedWishListItems);
    JSONWishList = JSON.stringify(wishList);
    localStorage.setItem('wishList', JSONWishList);
    $("#DeletedGamesCount").html(gamesDeleted);
    console.log(gamesDeleted);
    console.log(JSON.parse(localStorage['deletedWishList']));
    console.log("wishlist " + wishList);
    console.log(JSONWishList);
    console.log(JSON.parse(localStorage['wishList']));



  })


  $("#accordion").on("click", ".btn", function () {
    console.log("wishlist accordian clicked");

    var game = this.id.replace("---", '-')
    $("#cardBody" + game).empty();
    console.log(this.id)
    console.log(game)
    var queryURL = "https://api.rawg.io/api/games/" + game;
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function (response) {
      console.log(response);
      currentAccordian = $("#cardBody" + game);
      var tags = $("<h5>");
      //tags.html("tags: " + response.tags[0].name + " and " + response.tags[1].name);
      var rating = $("<p>").html(response.metacritic);
      // console.log(tags);
      $("#cardbody" + game).append
      var description = $("<div>").attr({ "id": "responseDescription" });
      description.append(response.description);
      currentAccordian.append("<strong>Description</strong>: " + response.description);
      currentAccordian.append(tags);
      currentAccordian.append("Rating: " + response.rating);
      console.log(response);
    })
  });

  $("#accountNav").on("click", function (event) {
    console.log("this is working");
    $("#currentWishListCount").html(wishList.length - 1);
    $("#totalWishListCount").html((wishList.length - 1) + gamesDeleted);


  })


  //game wishlist being populated
  $("#wishlistButton").on("click", function (event) {
    event.preventDefault();
    console.log($(this))
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
      console.log(JSON.parse(localStorage['wishList']));


    }
    console.log(wishList);
    $("#gameInfoDismissal").click();


  })

  ///////////////////////////////////////</modals>////////////////////////////////////////////////////////////////


  //runs when the page is loaded. populates the wishList with the stored local data
  function localDataPopulatingWishList() {
    wishList = JSON.parse(localStorage['wishList'])
    gamesDeleted = JSON.parse(localStorage['deletedWishList'])
    $("#DeletedGamesCount").html(gamesDeleted);
    console.log(wishList);
  }

  localDataPopulatingWishList();
  console.log(wishList)

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