


// Initialize Firebase
var config = {
  apiKey: "AIzaSyA2mrxV8z0Qd313Wx5GgZl2c_1pmxZXglw",
  authDomain: "trainscheduler-2170a.firebaseapp.com",
  databaseURL: "https://trainscheduler-2170a.firebaseio.com",
  projectId: "trainscheduler-2170a",
  storageBucket: "trainscheduler-2170a.appspot.com",
  messagingSenderId: "1014874796463"
};
firebase.initializeApp(config);

var dataRef = firebase.database();


// Capture Button Click
$("#add-train").on("click", function(event) {
  event.preventDefault();

  // Capture User Inputs and store them into variables
  var trainName = $("#name-input").val().trim();
  var destination = $("#destination-input").val().trim();
  var firstTime = $("#time-input").val().trim();
  var frequency = $("#frequency-input").val().trim();

  // check if fields are valid inputs.
  if (trainName != "" && destination !="" && firstTime != "" && frequency != "") {

    // code to push to firebase
    dataRef.ref('trainData').push({
        trainName: trainName,
        destination: destination,
        firstTime: firstTime,
        frequency: frequency,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
    });
  };

});


// loader
dataRef.ref('trainData').on("child_added", function(childSnapshot) {
  console.log("child_added");
  // dealing with time
  var frequency = childSnapshot.val().frequency;
  var firstTime = childSnapshot.val().firstTime;
  var nextTime = moment(firstTime, "hmm")
  console.log("start of " + nextTime.format("YYYY-MM-DD HH:mm"));

  while (nextTime.isBefore()) {
    nextTime.add(frequency, 'minutes');
    console.log("currently " + nextTime.format("HH:mm"));
  }


  $("tbody").append("<tr>"
    + "<td>" + childSnapshot.val().trainName + "</td>"
    + "<td>" + childSnapshot.val().destination + "</td>"
    + "<td>" + frequency + "</td>"
    + "<td>" + nextTime.format("hh:mm A") + "</td>"
    + "</tr>");
});
