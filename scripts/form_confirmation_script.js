let currentUser;

// Check if user is logged in and display their name in the header
function insertName() {
    firebase.auth().onAuthStateChanged(user => {
        // Check if user is signed in:
        if (user) {
            // Do something for the current logged-in user here: 
            //console.log(user.uid);
            //go to the correct user document by referencing to the user uid
            currentUser = db.collection("users").doc(user.uid);
            //get the document for current user.
            currentUser.get()
                .then(userDoc => {
                    var user_Name = userDoc.data().name;
                    $("#name").text(user_Name); //using jquery
                    document.getElementById("fname").value = user_Name;
                })
        }
    });
}
insertName();

// Event listner for form submission
document.getElementById("submit_form").addEventListener("click", () => {
    window.location.assign("submitted.html");
})

// Validate if form entries have been inputted correctly
function validate(field) {
    console.log("field: " + field);
    if (field == 1) {
        let firstName = document.getElementById("fname")
        if (firstName.value == "") {
            document.getElementById("fname-label").style.color = "red";
        } else {
            document.getElementById("fname-label").style.color = "black";
        }
    }
    if (field == 2) {
        let lastName = document.getElementById("lname")
        console.log(lastName.value);
        if (lastName.value == "") {
            document.getElementById("lname-label").style.color = "red";
        } else {
            document.getElementById("lname-label").style.color = "black";
        }
    }
    if (field == 3) {
        let phone = document.getElementById("mob")
        if (phone.value == "") {
            document.getElementById("phone-label").style.color = "red";
        } else {
            document.getElementById("phone-label").style.color = "black";
        }
    }
}