// DON"T DELETE THIS!!! THIS IS THE SEARCH FUNCTIONALITY!!!
// document.querySelector("form").addEventListener("submit", (e) => {
//     e.preventDefault();
//     let test = document.getElementById("location-search").value;

//     //console.log(test);

//     // append location text after slash and before question mark
//     $.ajax({
//         url: "https://api.mapbox.com/geocoding/v5/mapbox.places/" + test + ".json?access_token=pk.eyJ1Ijoidndnb2xmZ3RpIiwiYSI6ImNrcHJhcHhwOTAyM28ydXBpMWlranpwOGkifQ.JtdxQSekLtejtN-cjEIg_A",
//         contentType: "application/json",
//         dataType: 'json',
//         success: function (result) {
//             console.log(result);
//         }
//     })
// })


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


// map.on('click', function (e) {
//     //console.log(e);
//      let coordinates = e.lngLat;
//     // //console.log(coordinates);
//     // //popUpBox();
//     new mapboxgl.Popup()
//         .setLngLat(coordinates)
//         .setHTML('there is a volunteering opportunity here <br>' + coordinates)
//         .addTo(map);
// });

// const marker = new mapboxgl.Marker({
//     draggable: true
// }).setLngLat([-123.1, 49.21])
//     .addTo(map);

// const marker1 = new mapboxgl.Marker()
//     .setLngLat([-123.11, 49.23]) 
//     .addTo(map);


// map.on('style.load', function () {
//     map.on('click', function (e) {
//         var coordinates = e.lngLat;
//         //console.log(coordinates);
//         //popUpBox();
//         new mapboxgl.Popup()
//             .setLngLat(coordinates)
//             .setHTML('there is a volunteering opportunity here <br>' + coordinates)
//             .addTo(map);
//     });
// });

// popUpBox = () => {
//     console.log("is this working");

// }

// 
// const btn = document.querySelectorAll("button");
// btn.forEach((b) => {
//     b.addEventListener("click", (e) => {
//         if (e.target.id === "retrieve-from-db") {
//             dataBaseFunction();
//             getCoordinate();
//         }

//         if (e.target.id === "populate-to-map") {
//             populateMap();
//         }
//     })
// })

let tempCoorStorage = [];


// storeCoordinate = () => {
//     let test;
//     db.collection("pins").get()
//         .then(users => {
//             users.forEach(u => {
//                 console.log(u.data());
//                 //populateMap();
//                 tempCoorStorage.push(u.data());
//             })

//         })

//     console.log(tempCoorStorage);
// }

// update pins on map
//NOTE: MIGHT NOT BE NEEDED ANYMORE, POSSIBLY DELETE?
// YES we will go over everything at the end and delete code
/*         function updatePins() {
            firebase.auth().onAuthStateChanged(user => {
                if (user) {
                    //console.log(user.uid);
                    currentUser = db.collection("users").doc(user.uid).collection("volunteering_saved");
                    currentUser
                        .get()
                        .then(a => {
                            a.forEach(d => {
                                //console.log(d.data().address);
                                //tempCoorStorage.push(d.data());
                                new mapboxgl.Marker()
                                    .setLngLat([d.data().lng, d.data().lat])
                                    .addTo(map);
                            })
                        })
                }
            })
            //console.log(tempCoorStorage);
        }
        updatePins(); */

// this function retrieves from db
// dataBaseFunction = () => {
//     db.collection("users").doc(user.uid).get()
//         .then(users => {
//             users.forEach(u => {
//                 console.log(u.data());
//             })
//         })

// }
// dataBaseFunction();

// flow: first retrieve from db -> drop map pins


// this populates pins onto map
populateMap = () => {
    //console.log(tempCoorStorage);
    // new mapboxgl.Marker()
    //     .setLngLat([tempCoorStorage[0].lng, tempCoorStorage[0].lat])
    //     .addTo(map);
    // for (let i = 0; i < tempCoorStorage.length; i++) {
    //     console.log(tempCoorStorage[i].lng);
    //     console.log(tempCoorStorage[i].lat);

    //     // new mapboxgl.Marker()
    //     //     .setLngLat([tempCoorStorage[i].lng, tempCoorStorage[i].lat])
    //     //     .addTo(map);
    // }
}
//populateMap();

// get data from firebase regardless of user id
// function getAllData() {
//     //console.log("Init alldata");
//     firebase.auth().onAuthStateChanged(user => {
//         if (user) {
//             //console.log(user.uid);
//             currentUser = db.collection("all_volunteering").doc("all_details").collection("volunteering_saved");
//             //console.log(currentUser);
//             currentUser
//                 .get()
//                 .then(a => {
//                     a.forEach(d => {
//                         //console.log(d.data());
//                         //tempCoorStorage.push(d.data());

//                         // new mapboxgl.Marker()
//                         //     .setLngLat([d.data().lng, d.data().lat])
//                         //     .addTo(map);

//                         //locationList(d.data());
//                         //flyToLocation(d.data());


//                     })
//                 })
//         }

//     })
//     //console.log(tempCoorStorage);
// }
// getAllData();

// get data from firebase
function getData() {
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            //console.log(user.uid);
            //currentUser = db.collection("all_volunteering").doc("all_details").collection("volunteering_saved");

            currentUser = db.collection("all_volunteering");
            currentUser
                .get()
                .then(a => {
                    a.forEach(d => {
                        //console.log(d.data());
                        //console.log(d.data());
                        //tempCoorStorage.push(d.data());

                        const marker = new mapboxgl.Marker()
                            .setLngLat([d.data().lng, d.data().lat])
                            .addTo(map);

                        marker.getElement().addEventListener("click", () => {
                            //console.log(d.data().lat);
                            clearAllStyling(d.data().lat);
                            searchList(d.data().lat);
                            createPopUp(d.data());
                        })

                        locationList(d.data());

                        //flyToLocation(d.data());
                    })
                })
        }

        // if (user) {
        //     //console.log(user.uid);
        //     currentUser = db.collection("users").doc(user.uid);
        //     currentUser
        //         .get()
        //         .then(a => {
        //             //console.log(a.data());
        //         })
        // }
    })
    //console.log(tempCoorStorage);
}
getData();

function locationList(data) {
    //console.log(data);
    // address, category, description, number_volunteers
    //console.log(data);

    const listings = document.getElementById('volunteering-listing');

    /* Add the link to the individual listing created above. */
    const link = listings.appendChild(document.createElement('a'));
    link.href = '#';
    link.className = 'list-group-item list-group-item-action';
    link.id = `link-${data.lat}`;
    //link.innerHTML = `${data.address}`;


    const listing = link.appendChild(document.createElement('div'));
    /* Assign a unique `id` to the listing. */
    listing.id = `listing-${data.lat}`;
    /* Assign the `item` class to each listing for styling. */
    listing.className = 'd-flex w-100 justify-content-between';
    //listing.style = "border: 1px solid black; margin: 1em";


    const heading = listing.appendChild(document.createElement("h5"));
    heading.className = 'mb-1';
    heading.innerHTML = `<b>Title:</b> ${data.title}`;

    // add request snippet
    const request = link.appendChild(document.createElement("p"));
    request.className = 'mb-1';
    request.innerHTML = `<b>Request:</b> ${data.description}`;

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

    // andy wrote this dont delete
    // const saveBtn = document.createElement("button");

    detailsBtn.className = "btn bg-important whitetext btn-sm";
    detailsBtn.type = "button";
    detailsBtn.innerText = "View Request";

    link.appendChild(detailsBtn);



    /* Add details to the individual listing. */


    /*  const details = listing.appendChild(document.createElement('div'));
     const save = listing.appendChild(document.createElement('div'));
     listing.appendChild(detailsBtn);
     listing.appendChild(saveBtn);
     detailsBtn.innerText = "view more";
     saveBtn.innerText = "Save"; */

    // Andy wrote this, dont delete
    //  alreadySaved(data, saveBtn); 


    //let arr = [data];

    detailsBtn.addEventListener("click", () => {
        localStorage.setItem("t1", JSON.stringify(data));
        window.location.assign("html/request_description.html")
    })

    // Andy wrote thid, don'd delete
    /* saveBtn.addEventListener("click", () => {
        saveRequest(data);
        saveBtn.disabled = true;
        saveBtn.innerText = "Saved!";
    }) */

    // const volCategory = data.category;
    // const volDescript = data.description;
    // const numVol = data.number_volunteers;

    //const volContainer = document.createElement("div");
    //volContainer.innerText = volCategory;

    //listing.appendChild(volCategory);


    /* details.innerHTML = `Description: ${data.description}`;
    details.innerHTML += `<br>`;
    details.innerHTML += `Category: ${data.category}`;
    details.innerHTML += `<br>`;
    details.innerHTML += `Volunteers Needed: ${data.number_volunteers}`; */

    // details.innerHTML += `<br>`;
    // details.innerHTML += `<button>View more</button>`;

    link.addEventListener('click', function (e) {

        // for (const feature of stores.features) {
        //     if (this.id === `link-${feature.properties.id}`) {
        flyToLocation(data);
        createPopUp(data);
        clearCurrStyling();
        //     }
        // }
        // const activeItem = document.getElementsByClassName('active');
        // if (activeItem[0]) {
        //     activeItem[0].classList.remove('active');
        // }
        // this.parentNode.classList.add('active');
    });

}

function getRequestID() {
    firebase.auth().onAuthStateChanged(d => {
        if (d) {
            currentId = db.collection("all_volunteering");
            console.log(d);

            // currentId.get()
            // .then(a => {
            //     console.log({a});
            // })
        }
    })
}

// structure of coordinates
//"coordinates": [
//  -77.049766,
//  38.900772
// ]
function flyToLocation(data) {
    //console.log({data});
    let tempArr = [];
    tempArr.push(data.lng);
    tempArr.push(data.lat);
    map.flyTo({
        center: tempArr,
        zoom: 15
    });
}

function createPopUp(data) {
    //console.log(data)

    const popUps = document.getElementsByClassName('mapboxgl-popup');
    /** Check if there is already a popup on the map and if so, remove it */
    if (popUps[0]) popUps[0].remove();

    const popup = new mapboxgl.Popup({ closeOnClick: false, offset: [0, -35], className: 'my-class' })
        .setLngLat([data.lng, data.lat])
        .setHTML(`<b>${data.title} </b><br><br>`
            +`<div>${data.person_name} made this request. </div>`
            + `<div>About me: <br> ${data.user_description}</div>`
        )
        .addTo(map);
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
                    var user_Name = userDoc.data().name;
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

function searchList(data) {

    const listing = document.getElementById(
        `listing-${data}`
    );

    let currListing = listing.getAttribute("class") + " list-group-item active";

    listing.setAttribute("class", currListing);
    listing.scrollIntoView();

}

function clearAllStyling(data) {

    const listing = document.getElementById(
        `volunteering-listing`
    );

    let children = listing.children;
    //console.log(children);

    for (let i = 0; i < children.length; i++) {
        let child = children[i];
        //console.log(child.children[0].getAttribute("class"));
        let defaultStyle = child.children[0].getAttribute("class");

        //console.log(defaultStyle);

        if (defaultStyle === "d-flex w-100 justify-content-between list-group-item active") {
            child.children[0].setAttribute("class", "d-flex w-100 justify-content-between");
        }
    }

    //console.log(listing);

    //let defaultStyle = listing.getAttribute("style");
    //console.log(defaultStyle);
    //console.log(defaultStyle === "border: 1px solid black; margin: 1em;");
}

function clearCurrStyling() {

    const listing = document.getElementById(
        `volunteering-listing`
    );

    let children = listing.children;
    //console.log(children);

    for (let i = 0; i < children.length; i++) {
        let child = children[i];
        //console.log(child.children[0].getAttribute("class"));
        let defaultStyle = child.children[0].getAttribute("class");

        //console.log(defaultStyle);

        if (defaultStyle === "d-flex w-100 justify-content-between list-group-item active") {
            child.children[0].setAttribute("class", "d-flex w-100 justify-content-between");
        }
    }

    //console.log(listing);

    //let defaultStyle = listing.getAttribute("style");
    //console.log(defaultStyle);
    //console.log(defaultStyle === "border: 1px solid black; margin: 1em;");
}


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