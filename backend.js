var inputName;
var stateCode;
var widgetTemplate = $("#widget").clone();
$("#widget").hide();
// Wrap the whole Ticketmaster API in a function

$("#magicVid").on("click", function(event) {
    var newWidget = widgetTemplate.clone();
    newWidget.html("");
    newWidget.attr("w-keyword", $("#wikiInput").val());
    $("#test5").append(newWidget);

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

        snapshot.forEach(function(childSnapshot) {

            var childData = childSnapshot.val();

            for (var key in childData) {

                if (childData[key] === userName) {

                    console.log("Username already taken");


                }

            };

        });


        // database.ref().push(newUser);

        $("#firebase-user").val("");

        return false;

    });

});


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
            $("#test2").prepend(outerDiv);

        };

    });

    // database.ref("-Kfmhi-2S0UeCp_Ai1V_").push(inputName);
// stateCode = $("#stateCode").val().trim();

var tm = "https://app.ticketmaster.com/discovery/v2/events.json?apikey=WxAxtOVl8IoU8wly3IEFwxIoVRVUWac0&keyword="+ inputName +"&page=1&size=4";

// + "&stateCode="+ stateCode


$.ajax({
        url: tm,
        method: "GET"
    })

 .done(function(result) {

    for (var i = 0; i < 4; i++) {
  
   var tmTest = result._embedded.events[i].name;
   var date = result._embedded.events[i].dates.start.localDate;
   var venue = result._embedded.events[i]._embedded.venues[0].name + " in " + result._embedded.events[i]._embedded.venues[0].city.name;
   var redirect = result._embedded.events[i].url;

    console.log(tmTest);
    console.log(date);
    console.log(venue);
    console.log(redirect);

};
       

    });



});


$("#test2").on("click", ".video-file", function(event) {
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

        $("#test").html(contentDiv);

        // Setting the catImage src attribute to imageUrl
        contentDiv.append(content);
        var imgLink = $('<img id="format" src="' + image + '">')
        contentDiv.prepend(imgLink);
        contentDiv.prepend(titleDiv);

    });


});
