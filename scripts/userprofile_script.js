
        //Adds the information of the user into the boxes
        function populateInfo() {
            firebase.auth().onAuthStateChanged(user => {
                // Check if user is signed in:
                if (user) {

                    //go to the correct user document by referencing to the user uid
                    currentUser = db.collection("users").doc(user.uid)
                    //get the document for current user.
                    currentUser.get()
                        .then(userDoc => {
                            //get the data fields of the user
                            var userName = userDoc.data().name;
                            var userAbout = userDoc.data().aboutUser;
                            let userStuNum = userDoc.data().studentNumber;
                            let userPhoneNum = userDoc.data().phoneNumber;
                            let isStudent = userDoc.data().studentStatus;
                            let vaxStat = userDoc.data().vaxStatus;

                            //if the data fields are not empty, then write them in to the form.
                            if (userName != null) {
                                document.getElementById("nameInput").value = userName;
                                document.getElementById("name").innerText = userName;
                            }
                            if (userAbout != null) {
                                document.getElementById("userAbout").value = userAbout;
                            }
                            if (userStuNum != null && isStudent)  {
                                document.getElementById("studentdiv").style.display = "block";
                                document.getElementById("stuNum").innerText = userStuNum;
                            }
                            if (userPhoneNum != null && !isStudent) {
                                document.getElementById("publicdiv").style.display = "block";
                                document.getElementById("phoneNum").innerText = userPhoneNum;
                            }
                            if (!vaxStat) {
                                document.getElementById("notvax").style.display = "block";
                                document.getElementById("vaxxeddiv").style.display = "none";
                            }
                        })
                } else {
                    // No user is signed in.
                    console.log("No user is signed in");
                }
            });
        }

        //call the function to run it 
        populateInfo();

        //Edit the information of the user
        function editUserInfo() {
            //Enable the form fields
            document.getElementById('personalInfoFields').disabled = false;
        }

        //Saves changes on the form to the database
        function saveUserInfo() {
            userName = document.getElementById('nameInput').value;
            userDesc = document.getElementById('userAbout').value;

            currentUser.update({
                name: userName,
                aboutUser: userDesc
            })
                .then(() => {
                    document.getElementById("name").innerText = userName;
                })

            document.getElementById('personalInfoFields').disabled = true;
        }

        //Log out
        function logout() {
            firebase.auth().signOut().then(() => {
                // Sign-out successful.
                window.location.href = "../index.html";
              }).catch((error) => {
                // An error happened.
              });
        }
