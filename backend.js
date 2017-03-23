var inputName;
var stateCode;
var widgetTemplate = $("#widget").clone();
$("#widget").hide();
// Wrap the whole Ticketmaster API in a function

$("#magicVid").on("click", function(event) {
    var newWidget = widgetTemplate.clone();
    newWidget.html("");
    newWidget.attr("w-keyword", $("#wikiInput").val());
    $("#ticketContent").prepend(newWidget);

    $.getScript("https://ticketmaster-api-staging.github.io/products-and-docs/widgets/event-discovery/1.0.0/lib/main-widget.js");

})


// Initialize Firebase
var config = {
    apiKey: "AIzaSyCRkSoQczfkOCF7pmk5jftla3A7DEzaZXE",
    authDomain: "lytify-217d3.firebaseapp.com",
    databaseURL: "https://lytify-217d3.firebaseio.com",
    storageBucket: "lytify-217d3.appspot.com",
    messagingSenderId: "389108121768"
};

firebase.initializeApp(config);

var database = firebase.database();

$("#submit-btn-firebase").on("click", function(event) {
    event.preventDefault();

    var userName = $("#firebase-user").val().trim();

    database.ref().once("value", function(snapshot) {

        var childData = snapshot.val();

        var userExsist = checkUser(childData, userName);
        if(userExsist){

            console.log("Already exists");


        }else{
            
            var User = {

                userName: userName
            };

            database.ref().push(User);
            console.log("Added to Firebase");

        }

    });
});

function checkUser(data, userName) {
    var checker = false;

    //for (var key in data) {

    for (var key in data) {

        if (data[key].userName === userName) {

            checker = true;
        }

    }

    return checker;

};

console.log(checkUser({ 1: { userName: "jared" }, 2: { userName: "saul" } }, "jared"));



// On page load, create an empty video playlist
$("#magicVid").on("click", function(event) {
    event.preventDefault();
    var youtubeAPIKey = "AIzaSyCq3JnzjpVN1WGz09rjvI0tQeKbiaR27-g";
    var youtubeLink = "https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=" + inputName + "&type=video&key=AIzaSyCq3JnzjpVN1WGz09rjvI0tQeKbiaR27-g";

    // Perfoming an AJAX GET request to our queryURL
    $.ajax({
        url: youtubeLink,
        method: "GET"
    })

    .done(function(receiving) {

        for (var i = 0; i < 25; i++) {

            var videoPhoto = receiving.items[i].snippet.thumbnails.medium.url;
            var videoTitle = receiving.items[i].snippet.title;
            var fullLink = $("<img class='vidPics' src='" + videoPhoto + "'>");
            var outerDiv = $("<div>");
            var titleDiv = $("<div>");
            titleDiv.addClass("video-title");
            titleDiv.append(videoTitle);
            outerDiv.prepend(titleDiv);
            outerDiv.attr("data-file", receiving.items[i].id.videoId);
            outerDiv.attr("id", receiving.items[i].id.videoId);
            outerDiv.addClass("video-file");
            console.log(fullLink);
            outerDiv.append(fullLink);
            $("#youtubeVideos").prepend(outerDiv);

        };

    });

});


$("#youtubeVideos").on("click", ".video-file", function(event) {
    event.preventDefault();
    var videoID = $(this).attr("data-file");
    console.log(videoID);
    $(this).html('<iframe width="560" height="315" src="https://www.youtube.com/embed/' + videoID + '" frameborder="0" allowfullscreen></iframe>');


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
        var titleDiv = $("<div class='wiki-title'>");
        titleDiv.append(inputName);

        // Creating and storing an image tag
        var contentDiv = $("<div id='wikiContent'>");

        $("#modal").html(contentDiv);

        // Setting the catImage src attribute to imageUrl
        contentDiv.append(content);
        var imgLink = $('<img id="format" src="' + image + '">')
        contentDiv.prepend(imgLink);
        contentDiv.prepend(titleDiv);

    });


});
