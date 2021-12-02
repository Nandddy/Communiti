mapboxgl.accessToken = 'pk.eyJ1Ijoidndnb2xmZ3RpIiwiYSI6ImNrcHJhcHhwOTAyM28ydXBpMWlranpwOGkifQ.JtdxQSekLtejtN-cjEIg_A';

const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/streets-v11', // style URL
    center: [-123.11, 49.24], // starting position [lng, lat]
    zoom: 10 // starting zoom
});

// Add map to application
map.addControl(
    new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        mapboxgl: mapboxgl
    })
);


// get data from firebase
function getData() {
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            currentUser = db.collection("all_volunteering");
            currentUser
                .get()
                .then(a => {
                    a.forEach(d => {
                        const marker = new mapboxgl.Marker()
                            .setLngLat([d.data().lng, d.data().lat])
                            .addTo(map);

                        marker.getElement().addEventListener("click", () => {
                            clearAllStyling(d.data().lat);
                            searchList(d.data().lat);
                            createPopUp(d.data());
                        })

                        locationList(d.data());
                    })
                })
        }
    })
}
getData();

// Dynamically build location list and attach new requests to html
function locationList(data) {
    const listings = document.getElementById('volunteering-listing');

    /* Add the link to the individual listing created above. */
    const link = listings.appendChild(document.createElement('a'));
    link.href = '#';
    link.className = 'list-group-item list-group-item-action';
    link.id = `link-${data.lat}`;


    const listing = link.appendChild(document.createElement('div'));

    /* Assign a unique `id` to the listing. */
    listing.id = `listing-${data.lat}`;

    /* Assign the `item` class to each listing for styling. */
    listing.className = 'd-flex w-100 justify-content-between';

    const heading = listing.appendChild(document.createElement("h5"));
    heading.className = 'mb-1';
    heading.innerHTML = `<b>Title:</b> ${data.title}`;

    // add request snippet
    const request = link.appendChild(document.createElement("p"));
    if (data.description.length > 50) {
        //console.log(data.description);
        request.innerHTML = `<b>Request:</b> ${data.description.substring(0, 50)} ...`;
    } else {
        request.innerHTML = `<b>Request:</b> ${data.description}`;
    }
    const location = link.appendChild(document.createElement("p"));
    location.className = "mb-1";
    location.innerHTML = `<b>Location:</b> ${data.address}`;

    const category = link.appendChild(document.createElement("p"));
    category.className = "mb-1";
    category.innerHTML = `<b>Category of request:</b> ${data.category}`;

    const volunteerNeeded = link.appendChild(document.createElement("p"));
    volunteerNeeded.className = "mb-1";
    volunteerNeeded.innerHTML = `<b>Volunteers needed:</b> ${data.number_volunteers}`;

    const detailsBtn = document.createElement("button");

    detailsBtn.className = "btn bg-important whitetext btn-sm";
    detailsBtn.type = "button";
    detailsBtn.innerText = "View Request";

    link.appendChild(detailsBtn);


    detailsBtn.addEventListener("click", () => {
        localStorage.setItem("t1", JSON.stringify(data));
        window.location.assign("html/request_description.html")
    })

    link.addEventListener('click', function (e) {

        flyToLocation(data);
        createPopUp(data);
        clearCurrStyling();
    });

}

// Get request ID
function getRequestID() {
    firebase.auth().onAuthStateChanged(d => {
        if (d) {
            currentId = db.collection("all_volunteering");
            console.log(d);
        }
    })
}

// MapBox function to fly to each pin on the map
function flyToLocation(data) {
    let tempArr = [];
    tempArr.push(data.lng);
    tempArr.push(data.lat);
    map.flyTo({
        center: tempArr,
        zoom: 15
    });
}

// Creates popup data on pin click
function createPopUp(data) {

    const popUps = document.getElementsByClassName('mapboxgl-popup');

    /** Check if there is already a popup on the map and if so, remove it */
    if (popUps[0]) popUps[0].remove();

    const popup = new mapboxgl.Popup({ closeOnClick: false, offset: [0, -35], className: 'my-class' })
        .setLngLat([data.lng, data.lat])
        .setHTML(`<b>${data.title} </b><br><br>`
            + `<div>${data.person_name} made this request. </div>`
            + `<div>About me: <br> ${data.user_description}</div>`
        )
        .addTo(map);
}


// Inserts name onto HTML header
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
                    $("#name").text(user_Name);                         
                })
        } else {
            // No user is signed in.
        }
    });
}

insertName();

// Searches list for current item, highlights it
function searchList(data) {

    const listing = document.getElementById(
        `listing-${data}`
    );

    let currListing = listing.getAttribute("class") + " list-group-item active";

    listing.setAttribute("class", currListing);
    listing.scrollIntoView();

}

// Clears all list styling on every click of the map pin
function clearAllStyling(data) {

    const listing = document.getElementById(
        `volunteering-listing`
    );

    let children = listing.children;

    for (let i = 0; i < children.length; i++) {
        let child = children[i];
        let defaultStyle = child.children[0].getAttribute("class");
        if (defaultStyle === "d-flex w-100 justify-content-between list-group-item active") {
            child.children[0].setAttribute("class", "d-flex w-100 justify-content-between");
        }
    }

}

// Clears current list styling
function clearCurrStyling() {

    const listing = document.getElementById(
        `volunteering-listing`
    );

    let children = listing.children;

    for (let i = 0; i < children.length; i++) {
        let child = children[i];
        let defaultStyle = child.children[0].getAttribute("class");


        if (defaultStyle === "d-flex w-100 justify-content-between list-group-item active") {
            child.children[0].setAttribute("class", "d-flex w-100 justify-content-between");
        }
    }

}

// Saves pin request to Firebase
function saveRequest(data) {

    currentUser.collection("volunteering_saved").add({
        title: data.title,
        address: data.address,
        category: data.category,
        description: data.description,
        lat: data.lat,
        lng: data.lng,
        number_volunteers: data.number_volunteers,
        uid: data.uid,
        person_name: data.person_name,
        user_description: data.aboutUser
    })
        .then(() => {
            //done
        })
}

// Determines if this volunteering request has already been saved to Firebase
// Disables the button is already saved
function alreadySaved(data, saveBtn) {

    var returnVal = currentUser.collection("volunteering_saved").where("lat", "==", data.lat)
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                if (doc.data().lng == data.lng) {
                    saveBtn.disabled = true;
                    saveBtn.innerText = "Saved!";
                }
            });
        })
        .catch((error) => {
            console.log("Error getting documents: ", error);
        });
}