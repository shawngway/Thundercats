var search = function() {
   
    event.preventDefault()

    var gameTitle = $("#gameInput").val()

    console.log(gameTitle)

    $("#gameInput").val("")

}

$(document).on("click", "#search", search) //on click of the sumbit button, calls the search function