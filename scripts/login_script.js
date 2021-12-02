// Initialize the FirebaseUI Widget using Firebase.
var ui = new firebaseui.auth.AuthUI(firebase.auth());

var uiConfig = {
    callbacks: {
        signInSuccessWithAuthResult: function (authResult, redirectUrl) {
            // User successfully signed in.
            // Return type determines whether we continue the redirect automatically
            // or whether we leave that to developer to handle.
            //------------------------------------------------------------------------------------------
            // The code below is modified from default snippet provided by the FB documentation.
            //
            // If the user is a "brand new" user, then create a new "user" in your own database.
            // Assign this user with the name and email provided.
            // Before this works, you must enable "Firestore" from the firebase console.
            // The Firestore rules must allow the user to write. 
            //------------------------------------------------------------------------------------------
            var user = authResult.user;                            // get the user object from the Firebase authentication database
            if (authResult.additionalUserInfo.isNewUser) {         //if new user
                db.collection("users").doc(user.uid).set({         //write to firestore. We are using the UID for the ID in users collection
                    name: user.displayName,                    //"users" collection
                    email: user.email                          //with authenticated user's ID (user.uid)
                }).then(function () {
                    console.log("New user added to firestore");
                    window.location.assign("signup.html");       //re-direct to main.html after signup
                })
                    .catch(function (error) {
                        console.log("Error adding new user: " + error);
                    });
            } else {
                return true;
            }
            return false;
        },
        uiShown: function () {
            // The widget is rendered.
            // Hide the loader.
            document.getElementById('loader').style.display = 'none';
        }
    },
    // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
    signInFlow: 'popup',
    signInSuccessUrl: 'main.html',
    signInOptions: [
        // Leave the lines as is for the providers you want to offer your users.
        //firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        //firebase.auth.FacebookAuthProvider.PROVIDER_ID,
        //firebase.auth.TwitterAuthProvider.PROVIDER_ID,
        //firebase.auth.GithubAuthProvider.PROVIDER_ID,
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
        //firebase.auth.PhoneAuthProvider.PROVIDER_ID
    ],
    // Terms of service url.
    tosUrl: 'index.html',
    // Privacy policy url.
    privacyPolicyUrl: 'login.html'
};

// The start method will wait until the DOM is loaded.
ui.start('#firebaseui-auth-container', uiConfig);


/* 

Preliminary testing code below to try to make a non-prebuilt UI for login.
Abandoned due to time constraints.

*/


//Credits to C.Lee on Stackoverflow
//checks to make sure email is in the form anystring@anystring.anystring
//function validateEmail(email) {
//    var re = /\S+@\S+\.\S+/;
//    return re.test(email);
//}

//function validatePassword(password) {
//    return (password.length > 5);
//}


//THIS FUNCTION CURRENTLY DOES NOT WORK.
/* function createNewUser() {
    //var displayName = document.getElementById("typeDisplayName");
    var displayName = "Test";
    var email = document.getElementById("typeEmailX").value;
    var password = document.getElementById("typePasswordX").value;
    if (validateEmail(email) && validatePassword(password)) {
        console.log("Okay");
        
        firebase.auth().createUserWithEmailAndPassword(email, password) //something is wrong starting from here
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                window.location.assign("signup.html");
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                // ..
            });

    }
} */
//create new user
