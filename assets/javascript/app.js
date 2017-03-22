$(document).ready(function() {
    //Logs what is currently in the localStorage
    console.log("localStorage: " + localStorage.getItem("name"));
    var username = "";
    //On click function for the submit button in the log in page
    $(".login-submit").on("click", function(event) {
        event.preventDefault();

        //Stores the user input's value in username
        var username = $(".username-input").val().trim();
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
        window.location.href = "index.html";
    });

});
