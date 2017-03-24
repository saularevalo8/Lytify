$(".usernameInput").html(localStorage.getItem("name"));
$(document).ready(function() {
    //Logs what is currently in the localStorage
    console.log("localStorage: " + localStorage.getItem("name"));
    var username = "";
    //On click function for the submit button in the log in page
    $("#login-submit").on("click", function(event) {
        event.preventDefault();

        //Stores the user input's value in username
        var username = $("#username-input").val().trim();
        console.log(username);


        function whichUser() {
            //Determines if the user is returning or new 
            //if returning user: 
            if (localStorage.getItem("name") === username) {
                // alert("Welcome back!")

                //redirect user to return page 
                window.location.href = "returnuser.html";

            }
            //if new user: 
            else {
                // alert("Welcome new user!")

                //clear previous key value in localStorage and set new input in localStorage
                localStorage.clear();

                localStorage.setItem("name", username);

                //redirect user to new user page 
                window.location.href = "newuser.html";
                

            };

        };

        whichUser();

    });

    //On Click for Log Out button
    $(".logout-button").on("click", function() {

        //Clears the key value pair inside the localStorage
        localStorage.clear();

        //Once the localStorage is cleared, redirect to log in page
        window.location.href = "login.html";
    });



});

var config = {
    apiKey: "AIzaSyCRkSoQczfkOCF7pmk5jftla3A7DEzaZXE",
    authDomain: "lytify-217d3.firebaseapp.com",
    databaseURL: "https://lytify-217d3.firebaseio.com",
    storageBucket: "lytify-217d3.appspot.com",
    messagingSenderId: "389108121768"
};

firebase.initializeApp(config);

var database = firebase.database();

var testName = localStorage.getItem("name");

var keyVar;

var reLoadArr = [];

var obj = {
    userName: testName
};

// $("#magicVid").on("click", function(event) {
database.ref().on('child_added', function(snapshot) {
    console.log(snapshot.val());
    var data = snapshot.val();
    for (var key in data) {

        if (data[key] === testName) {

            console.log(snapshot.key);
            keyVar = snapshot.key;
            console.log(keyVar);
            var tester = snapshot.numChildren() - 1;
            console.log(tester);

            database.ref(keyVar).once('value', function(snap) {
                snap.forEach(function(item) {
                    var itemVal = item.val();
                    reLoadArr.push(itemVal);
                    var index = reLoadArr.indexOf(testName);
                    if (index > -1) {

                        reLoadArr.splice(index, 1);
                    }
                });
                // for (i = 0; i < snapshot.key.length; i++) {
                //     counts.push(data[key][i]);
                //     console.log(keys);
                // }
            });


            $("#magicVid").on("click", function(event) {
                for (var i = tester; i < reLoadArr.length; i++) {

                    obj[i] = reLoadArr[i];
                    database.ref(keyVar).update(obj);

                }
            });


        }

    }

});
// });
console.log(reLoadArr);


$("#magicVid").on("click", function(event) {

    reLoadArr.push($("#wikiInput").val().trim())
    console.log(reLoadArr);

});

