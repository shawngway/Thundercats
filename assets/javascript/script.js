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