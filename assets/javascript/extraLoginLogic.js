var config = {
    apiKey: "AIzaSyCRkSoQczfkOCF7pmk5jftla3A7DEzaZXE",
    authDomain: "lytify-217d3.firebaseapp.com",
    databaseURL: "https://lytify-217d3.firebaseio.com",
    storageBucket: "lytify-217d3.appspot.com",
    messagingSenderId: "389108121768"
};

firebase.initializeApp(config);

var database = firebase.database();


function whichUser() {

    var userName = $("#username-input").val().trim();
    //Determines if the user is returning or new 
    //if returning user: 
    if (localStorage.getItem("name") === userName) {
        // alert("Welcome back!")

        //redirect user to return page 
        window.location.href = "returnuser.html";

    } else {
        // alert("Welcome new user!")

        //clear previous key value in localStorage and set new input in localStorage
        localStorage.clear();

        localStorage.setItem("name", userName);
    };

};




//On Click for Log Out button
$(".logout-button").on("click", function() {

    //Clears the key value pair inside the localStorage
    localStorage.clear();

    //Once the localStorage is cleared, redirect to log in page
    window.location.href = "index.html";

});



$("#login-submit").on("click", function(event) {
    event.preventDefault();

    var userName = $("#username-input").val().trim();

    whichUser();

    database.ref().once("value", function(snapshot) {

        var childData = snapshot.val();

        var userExsist = checkUser(childData, userName);
        if (userExsist) {

            console.log("Already exists");
            $("#usernameInput").html(username);
            window.location.href = "returnuser.html";




        } else {

            var User = {

                userName: userName
            };

            database.ref().push(User);
            console.log("Added to Firebase");
            $("#usernameInput").html(username);
            window.location.href = "newuser.html";


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
var username = "";

if (localStorage.getItem("name") !== null) {
    // alert("You're already signed in");
    window.location.href = "returnuser.html"
};
