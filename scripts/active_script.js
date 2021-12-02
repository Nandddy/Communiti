
//Get the data of all requests made by the user
function getAllData() {
    //console.log("Init alldata");
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            console.log(user.uid);
            currentUser = db.collection("users").doc(user.uid).collection("volunteering_made");
            //console.log(currentUser);
            currentUser
                .get()
                .then(a => {
                    //test(a);
                    a.forEach(d => {
                        locationList(d.data());
                    })
                })



        }

    })
    //console.log(tempCoorStorage);
}
getAllData();

function getSavedRequestData() {
    firebase.auth().onAuthStateChanged(user => {
        currentUser = db.collection("users").doc(user.uid).collection("volunteering_saved");

        currentUser
            .get()
            .then(a => {
                a.forEach(d => {
                    //savedRequestList(d.data());
                    savedList(d.data());
                })
            })
    })
}
getSavedRequestData();

//Generate user's saved request list, display as cards
function savedList(data) {
    //console.log(data);
    // address, category, description, number_volunteers
    //console.log(data);

    const listings = document.getElementById('saved-listings');

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


    detailsBtn.className = "btn bg-important whitetext btn-sm";
    detailsBtn.type = "button";
    detailsBtn.innerText = "View Request";

    link.appendChild(detailsBtn);

    detailsBtn.addEventListener("click", () => {
        localStorage.setItem("t1", JSON.stringify(data));
        window.location.assign("request_description.html")
    })
}

//Update the list with requests that the user made
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

    detailsBtn.addEventListener("click", () => {
        localStorage.setItem("t1", JSON.stringify(data));
        window.location.assign("request_description.html")
    })

}

//Insert the user's name into the navbar
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
                    //console.log(userDoc.data().name);
                    var user_Name = userDoc.data().name;
                    //console.log(user_Name);
                    //method #1:  insert with html only
                    document.getElementById("name").innerText = userDoc.data().name;    //using javascript
                    //method #2:  insert using jquery
                    //$("#name-verification").text(user_Name);                         //using jquery
                })
        } else {
            // No user is signed in.
        }
    });
}
insertName();


//TEST CODE BELOW

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
    /* 
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
                }); */




            // function savedList(data) {
            //     //console.log(data);
            //     // address, category, description, number_volunteers
            //     //console.log(data);
            
            //     const listings = document.getElementById('saved-listings');
            //     const listing = listings.appendChild(document.createElement('div'));
            //     /* Assign a unique `id` to the listing. */
            //     //listing.id = `listing-${store.properties.id}`;
            //     /* Assign the `item` class to each listing for styling. */
            //     listing.className = 'item';
            //     listing.style = "border: 1px solid black; margin: 1em";
            
            //     /* Add the link to the individual listing created above. */
            //     const link = listing.appendChild(document.createElement('div'));
            //     link.href = '#';
            //     link.className = 'title';
            //     //link.id = `link-${store.properties.id}`;
            //     link.innerHTML = `${data.address}`;
            
            //     const btn = document.createElement("button");
            
            
            //     /* Add details to the individual listing. */
            //     const details = listing.appendChild(document.createElement('div'));
            //     listing.appendChild(btn);
            //     btn.innerText = "view more";
            
            //     //let arr = [data];
            
            //     btn.addEventListener("click", () => {
            //         localStorage.setItem("t1", JSON.stringify(data));
            //         window.location.assign("html/request_description.html")
            
            //         //console.log(data);
            //         //localStorage.getItem("t1", )
            //         //getRequestID();
            
            //         //console.log(e);
            //     })
            //     // const volCategory = data.category;
            //     // const volDescript = data.description;
            //     // const numVol = data.number_volunteers;
            
            //     //const volContainer = document.createElement("div");
            //     //volContainer.innerText = volCategory;
            
            //     //listing.appendChild(volCategory);
            //     details.innerHTML = `Description: ${data.description}`;
            //     details.innerHTML += `<br>`;
            //     details.innerHTML += `Category: ${data.category}`;
            //     details.innerHTML += `<br>`;
            //     details.innerHTML += `Volunteers Needed: ${data.number_volunteers}`;
            //     details.innerHTML += `<br>`;
            //     details.innerHTML += `${data.name_person} made this request`;
            //     // details.innerHTML += `<br>`;
            //     // details.innerHTML += `<button>View more</button>`;
            
            
            // }
            
            
            
            
            
            // function locationList(data) {
            //     //console.log(data);
            //     // address, category, description, number_volunteers
            //     //console.log(data);
            
            //     const listings = document.getElementById('volunteering-listing');
            //     const listing = listings.appendChild(document.createElement('div'));
            //     /* Assign a unique `id` to the listing. */
            //     //listing.id = `listing-${store.properties.id}`;
            //     /* Assign the `item` class to each listing for styling. */
            //     listing.className = 'item';
            //     listing.style = "border: 1px solid black; margin: 1em";
            
            //     /* Add the link to the individual listing created above. */
            //     const link = listing.appendChild(document.createElement('div'));
            //     link.href = '#';
            //     link.className = 'title';
            //     //link.id = `link-${store.properties.id}`;
            //     link.innerHTML = `${data.address}`;
            
            //     const btn = document.createElement("button");
            
            
            //     /* Add details to the individual listing. */
            //     const details = listing.appendChild(document.createElement('div'));
            //     listing.appendChild(btn);
            //     btn.innerText = "view more";
            
            //     //let arr = [data];
            
            //     btn.addEventListener("click", () => {
            //         localStorage.setItem("t1", JSON.stringify(data));
            //         window.location.assign("html/request_description.html")
            
            //         //console.log(data);
            //         //localStorage.getItem("t1", )
            //         //getRequestID();
            
            //         //console.log(e);
            //     })
            //     // const volCategory = data.category;
            //     // const volDescript = data.description;
            //     // const numVol = data.number_volunteers;
            
            //     //const volContainer = document.createElement("div");
            //     //volContainer.innerText = volCategory;
            
            //     //listing.appendChild(volCategory);
            //     details.innerHTML = `Description: ${data.description}`;
            //     details.innerHTML += `<br>`;
            //     details.innerHTML += `Category: ${data.category}`;
            //     details.innerHTML += `<br>`;
            //     details.innerHTML += `Volunteers Needed: ${data.number_volunteers}`;
            //     // details.innerHTML += `<br>`;
            //     // details.innerHTML += `<button>View more</button>`;
            
            
            // }

            
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

    /*             link.addEventListener('click', function (e) {
    
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
                }); */


                


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