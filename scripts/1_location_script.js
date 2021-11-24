mapboxgl.accessToken = 'pk.eyJ1Ijoidndnb2xmZ3RpIiwiYSI6ImNrcHJhcHhwOTAyM28ydXBpMWlranpwOGkifQ.JtdxQSekLtejtN-cjEIg_A';
const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/streets-v11', // style URL
    center: [-123.11, 49.24], // starting position [lng, lat]
    zoom: 10 // starting zoom
});

map.addControl(
    new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        mapboxgl: mapboxgl
    })
);


map.on('style.load', function () {
    map.on('click', function (e) {
        var coordinates = e.lngLat;
        reverseGetAddress(coordinates);
    });
});

let latitude;
let longitude;

function reverseGetAddress(coordinates) {
    latitude = coordinates.lat;
    longitude = coordinates.lng;

    $.ajax({
        url: "https://api.mapbox.com/geocoding/v5/mapbox.places/" + longitude + "," + latitude + ".json?access_token=pk.eyJ1Ijoidndnb2xmZ3RpIiwiYSI6ImNrcHJhcHhwOTAyM28ydXBpMWlranpwOGkifQ.JtdxQSekLtejtN-cjEIg_A",
        contentType: "application/json",
        dataType: 'json',
        success: function (result) {
            let box = document.getElementById("location-confirmation");
            box.style.color = "black";
            box.innerText = result.features[0].place_name
        }
    })
}


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
                    //console.log(userDoc.data());
                    var user_Name = userDoc.data().name;
                    getFormInfo(userDoc.data().name, userDoc.data().vaxStatus, userDoc.data().aboutUser);
                    //console.log(user_Name);
                    //method #1:  insert with html only
                    //document.getElementById("name-goes-here").innerText = n;    //using javascript
                    //method #2:  insert using jquery
                    $("#name").text(user_Name);                         //using jquery
                })
        } else {
            // No user is signed in.
        }
    });
}
insertName();

const getFormInfo = (name, vax, about) => {
    document.querySelector("form").addEventListener("submit", (e) => {
        e.preventDefault();
        let category = document.getElementById("volunteering-category").value;
        let numVolunteers = document.getElementById("num-volunteering").value;
        let description = document.getElementById("volunteering-description").value;
        let address = document.getElementById("location-confirmation").innerText;
        let title = document.getElementById("req-title").value;

        //Checking if the form is filled out
        if (title == "") {
            document.getElementById("title-error").innerText = "Please enter a title."
            document.getElementById("title-error").style.color = "red";
            document.getElementById("title-label").style.color = "red";
        }
        if (description == "") {
            document.getElementById("desc-error").innerText = "Please enter a description."
            document.getElementById("desc-error").style.color = "red";
            document.getElementById("desc-label").style.color = "red";
        }
        if (address == "") {
            document.getElementById("location-confirmation").innerText = "Please select the location of your request";
            document.getElementById("location-confirmation").style.color = "red";
        }
        if (numVolunteers == "") {
            numVolunteers = 1;
        }
        if (!(address == "" || address == "Please select the location of your request" || address == "Please select a location from the map!") && !(description == "") && !(title == "")) {
            sendToDB(category, numVolunteers, description, address, name, vax, about, title);
        }

    })
}
getFormInfo();



function sendToDB(cat, num, desc, addr, name, vax, about, title) {
    let numVolunteers = num;
    let volDescription = desc;
    let volAddress = addr;
    let date = Date().toString().substring(0, 25);

    //console.log(cat);

    firebase.auth().onAuthStateChanged(user => {
        // Check if user is signed in:
        if (user) {
            // Do something for the current logged-in user here: 
            //console.log(user);
            //go to the correct user document by referencing to the user uid
            currentUser = db.collection("users").doc(user.uid).collection("volunteering_made");
            currentUser
                // .doc sets the name for the sub collection
                .doc("volunteering_profile: " + date)
                // you set the fields here
                .set({
                    title: title,
                    category: cat,
                    number_volunteers: numVolunteers,
                    description: volDescription,
                    address: volAddress,
                    lat: latitude,
                    lng: longitude
                })
                .then(function () {
                    console.log("Document added");
                })
                .catch(function error() {
                    console.log("Error");
                })
        }

        if (user) {
            // Do something for the current logged-in user here: 
            //console.log(user.uid);
            //go to the correct user document by referencing to the user uid
            currentUser = db.collection("all_volunteering").doc();
            currentUser
                // .doc sets the name for the sub collection
                //.doc("volunteering_profile: " + date)
                // you set the fields here
                .set({
                    title: title,
                    category: cat,
                    number_volunteers: numVolunteers,
                    description: volDescription,
                    address: volAddress,
                    lat: latitude,
                    lng: longitude,
                    uid: user.uid,
                    vaccine_status: true,
                    user_description: about,
                    person_name: name
                })
                .then(function () {
                    console.log("Document added");
                    window.location.assign("../../main.html");
                })
                .catch(function error() {
                    console.log("Error");
                })
        } else {
            // No user is signed in.
        }
    });
}


function displayEmptyLocation() {
    let test = document.getElementById("location-confirmation");
    if (test.childNodes.length == 0) {
        test.innerHTML = "<b>Please select a location from the map!</b>";
    }
}
displayEmptyLocation();

