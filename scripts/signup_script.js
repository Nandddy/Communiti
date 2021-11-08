
        //Printing name for DB to check if its connected
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
                            $("#name-goes-here").text(user_Name);                         //using jquery
                        })
                } else {
                    document.getElementById("name-goes-here").innerText = "friend!";
                    // No user is signed in.
                }
            });
        }
        insertName();


        document.querySelector("#is_student").addEventListener("click", function (e) {
            e.preventDefault();
            let studentForm = document.getElementById("student-form");
            studentForm.style.display = "block";
            let formDiv = document.getElementById("public-form");
            formDiv.style.display = "none";
        });

        document.querySelector("#not_student").addEventListener("click", function (e) {
            e.preventDefault();
            let studentForm = document.getElementById("student-form");
            studentForm.style.display = "none";
            let formDiv = document.getElementById("public-form");
            formDiv.style.display = "block";
        });



        function studentSubmit() {
            console.log("Hello!");
            let stuNum = document.getElementById("student_number").value;
            let vaxStat = document.getElementsByName("vax");
            let vaxx;
            for (i = 0; i < vaxStat.length; i++) {
                if (vaxStat[0].checked) {
                    vaxx = true;
                } else if (vaxStat[1].checked) {
                    vaxx = false;
                }

            }
            let isStudent = true;

            if (studentFormChecker(stuNum, vaxx)) {
                firebase.auth().onAuthStateChanged(user => {
                    // Check if user is signed in:
                    if (user) {
                        db.collection("users").doc(user.uid).update({
                            studentNumber: stuNum,
                            vaxStatus: vaxx,
                            studentStatus: isStudent
                        }).then(function () {
                            window.location.assign("main.html");
                        })
                            .catch(function (error) {
                                console.log("Error adding new student information: " + error);
                            });
                    } else {
                        // No user is signed in.
                    }
                });
            } else {
                //
            }


        }


        function publicSubmit() {
            console.log("Hello!");
            let phoneNum = document.getElementById("phoneNumber1").value;
            let vaxStat = document.getElementsByName("vax1");
            let vaxx;
            for (i = 0; i < vaxStat.length; i++) {
                if (vaxStat[0].checked) {
                    vaxx = true;
                } else if (vaxStat[1].checked) {
                    vaxx = false;
                }

            }
            let isStudent = false;

            if (publicFormChecker(phoneNum,vaxx)) {
                firebase.auth().onAuthStateChanged(user => {
                // Check if user is signed in:
                if (user) {
                    db.collection("users").doc(user.uid).update({
                        phoneNumber: phoneNum,
                        vaxStatus: vaxx,
                        studentStatus: isStudent
                    }).then(function () {
                        window.location.assign("main.html");
                    })
                        .catch(function (error) {
                            console.log("Error adding new public user: " + error);
                        });
                } else {
                    // No user is signed in.
                }
            });
            }

        }

        function studentFormChecker(toCheckNum, toCheckVax) {
            var error = document.getElementById("errorS");
            var numLabel = document.getElementById("stu_num_label");
            var error2 = document.getElementById("errorS2");
            var numLabel2 = document.getElementById("stu_vax_label");
            var returnVal = true;

            //Student number checker
            if (toCheckNum.length == 8) {
                console.log("Student number is valid");
                error.textContent = "";
                numLabel.style.color = "black";
            } else {
                console.log("Student number is invalid");
                error.innerText = "Please enter a valid student number";
                error.style.color = "red";
                numLabel.style.color = "red";
                returnVal = false;
            }

            //Vax status checker
            if (!(toCheckVax == undefined)) {
                console.log("Vax stat is valid");
                error2.textContent = "";
                numLabel2.style.color = "black";
            } else {
                console.log("Vax stat is invalid");
                error2.innerText = "Please press an option";
                error2.style.color = "red";
                numLabel2.style.color = "red";
                returnVal = false;
            }
            return returnVal;
        }

        function publicFormChecker(toCheckNum, toCheckVax) {
            var error = document.getElementById("errorP");
            var numLabel = document.getElementById("pub_phone_label");
            var error2 = document.getElementById("errorP2");
            var numLabel2 = document.getElementById("pub_vax_label");
            var returnVal = true;

            //Phone number checker
            if (toCheckNum.length == 10) {
                console.log("Student number is valid");
                error.textContent = "";
                numLabel.style.color = "black";
            } else {
                console.log("Phone number is invalid");
                error.innerText = "Please enter a valid phone number";
                error.style.color = "red";
                numLabel.style.color = "red";
                returnVal = false;
            }

            //Vax status checker
            if (!(toCheckVax == undefined)) {
                console.log("Vax stat is valid");
                error2.textContent = "";
                numLabel2.style.color = "black";
            } else {
                console.log("Vax stat is invalid");
                error2.innerText = "Please press an option";
                error2.style.color = "red";
                numLabel2.style.color = "red";
                returnVal = false;
            }
            return returnVal;
        }