var currentUser  //put this right after you start script tag before writing any functions.

insertName();

// get local storage string
const localInfo = window.localStorage.getItem('t1');
// console.log(window.localStorage.getItem('t1'));

// parse the local storage string into useable objects
const requestInfo = JSON.parse(localInfo);
// console.log(requestInfo);

// fill specific divs with object information
function view() {
    if (localStorage.getItem('t1') != null) {
        document.getElementById("title-goes-here").innerHTML = requestInfo.title;
        document.getElementById("address-goes-here").innerHTML = requestInfo.address;
        document.getElementById("numvol-goes-here").innerHTML = requestInfo.number_volunteers;
        document.getElementById("category-goes-here").innerHTML = requestInfo.category;
        document.getElementById("description-goes-here").innerHTML = requestInfo.description;

        document.getElementById("name-goes-here").innerHTML = requestInfo.person_name;
        document.getElementById("vac-goes-here").innerHTML = requestInfo.vaccine_status;
        document.getElementById("profile-goes-here").innerHTML = requestInfo.user_description;

        var address = "<a href=\"https://google.com/maps/dir//";
        address += requestInfo.lat + "," + requestInfo.lng + "/@" + requestInfo.lat + "," + requestInfo.lng +
            "z\">Directions</a>"
        document.getElementById("link-goes-here").innerHTML = address;
    }
}
view();

document.getElementById("sign-up").addEventListener("click", () => {
    window.location.assign("form_confirmation.html");
})


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
                    alreadySaved(requestInfo.lat, requestInfo.lng, saveBtn);
                })
        } else {
            // No user is signed in.
        }
    });
}


const saveBtn = document.getElementById("save-btn");
saveBtn.innerText = "Save";



saveBtn.addEventListener("click", () => {
    saveRequest(requestInfo);
    saveBtn.disabled = true;
    saveBtn.innerText = "Saved!";
})

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
        user_description: data.user_description
    })
        .then(() => {
            //done
        })
}

function alreadySaved(lat, lng, saveBtn) {
    var returnVal = currentUser.collection("volunteering_saved").where("lat", "==", lat)
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                if (doc.data().lng == lng) {
                    saveBtn.disabled = true;
                    saveBtn.innerText = "Saved!";
                }
            });
        })
        .catch((error) => {
            console.log("Error getting documents: ", error);
        });
}