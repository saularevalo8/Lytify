var inputName;

// Wrap the whole Ticketmaster API in a function
function ticketMaster() {
    // This variable will be pre-programmed with our authentication key
    var authKeyTM = "WxAxtOVl8IoU8wly3IEFwxIoVRVUWac0";
}

// On page load, create an empty video playlist
$("#magicVid").on("click", function(event) {
    event.preventDefault();
    var youtubeAPIKey = "AIzaSyCq3JnzjpVN1WGz09rjvI0tQeKbiaR27-g";
    var youtubeLink = "https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=" + inputName + "&type=video&key=AIzaSyCq3JnzjpVN1WGz09rjvI0tQeKbiaR27-g"

    // Perfoming an AJAX GET request to our queryURL
    $.ajax({
        url: youtubeLink,
        method: "GET"
    })

    .done(function(receiving) {

        for (var i = 0; i < 25; i++){

        var videoId = receiving.items[i].id.videoId;
        var fullLink = '<iframe width="560" height="315" src="https://www.youtube.com/embed/' + videoId + '" frameborder="0" allowfullscreen></iframe>'
        $("#test2").prepend(fullLink);
        };

    });
});



// Wikipedia Submit on search

$("#submit-btn").on("click", function(event) {
    event.preventDefault();

    inputName = $("#wikiInput").val().trim();


    var baseLink = "https://en.wikipedia.org/w/api.php?format=json&action=query&format=json&titles=" + inputName + "&exintro&prop=extracts|pageimages&format=json&pithumbsize=300";

    console.log(baseLink);

    // Perfoming an AJAX GET request to our queryURL
    $.ajax({
        url: baseLink,
        method: "GET"
    })

    // After the data from the AJAX request comes back
    .done(function(response) {

        // Saving the image_original_url property
        var main = response.query.pages;
        var content;
        var image;
        console.log(main);
        for (var key in main) {
            content = main[key].extract;
            break;

        }

        for (var key in main) {
            image = main[key].thumbnail.source;
            break;

        }

        // Creating and storing an image tag
        var contentDiv = $("<div id='wikiContent'>");

        $("#test").html(contentDiv);

        // Setting the catImage src attribute to imageUrl
        contentDiv.append(content);
        var imgLink = $('<img id="format" src="' + image + '">')
        contentDiv.prepend(imgLink);

    });


});
