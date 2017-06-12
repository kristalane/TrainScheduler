


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

  var trainName = "";
  var destination = "";
  var firstTime = "HH:mm";
  var frequency = 0;
  var nextTime;
  // var minutesAway = 0;

  // Capture Button Click
  $("#add-train").on("click", function(event) {
    event.preventDefault();

  // Capture User Inputs and store them into variables
      trainName = $("#name-input").val().trim();
      destination = $("#destination-input").val().trim();
      firstTime = $("#time-input").val().trim();
      frequency = $("#frequency-input").val().trim();

  // check if fields are valid inputs.
  if (trainName != "" && destination !="" && firstTime != "" && frequency != "") {

  // if (Number.isInteger(frequency) === false) {
  //   alert("Sorry; the frequency field needs to be a number for this to work")
  // };


  // dealing with time
  var now = moment();
  nextTime = moment(firstTime).toNow("hh:mma");
  console.log("it happened " + nextTime);


  // code to push to firebase
    dataRef.ref('trainData').push({
        trainName: trainName,
        destination: destination,
        firstTime: firstTime,
        frequency: frequency,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
    });
  };
  // loader
  dataRef.ref('trainData').on("child_added", function(childSnapshot) {
    $("tbody").append("<tr><td>" + trainName + "<td>" + destination + "<td>" + frequency + "<td>");
  });
});
