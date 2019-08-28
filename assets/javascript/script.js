function gameFinder(){
    //jquery call for class or id of div to change.
    var genre = $(this).attr("data-name");
    var queryURL = "" + genre +"&api_key=d61ece206f9dedf20a9aa373ffa29739"

    $.ajax({
        url: queryURL,
        method: "GET"
    })
        .then(function (response) {
            var results = response.data;
            
        })
}