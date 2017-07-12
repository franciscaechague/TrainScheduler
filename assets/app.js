var config = {
  apiKey: "AIzaSyBA3nVHISxRSfIvp6LSsbWhnJHdYjrlnIE",
  authDomain: "trainschedule-a83d3.firebaseapp.com",
  databaseURL: "https://trainschedule-a83d3.firebaseio.com",
  projectId: "trainschedule-a83d3",
  storageBucket: "trainschedule-a83d3.appspot.com",
  messagingSenderId: "208279044728"
};
firebase.initializeApp(config);

var database = firebase.database();

$("#submit").on("click", function(){


		var name = $("#name").val().trim();
		var destination = $("#destination").val().trim();
		var firstTrain = moment($("#firstTrain").val().trim(), "HH:mm").subtract(1, "years").format("X");;
		var frequency = $("#frequency").val().trim();


    $("#name").val("");
    $("#destination").val("");
    $("#firstTrain").val("");
    $("#frequency").val("");



    database.ref("/trains").push({
      name:  name,
			destination: destination,
			firstTrain: firstTrain,
			frequency: frequency,
  });

		return false;
	});

	database.ref("/trains").on("child_added", function(childSnapshot, prevChildKey){


		var dataName = childSnapshot.val().name
		var dataDestination = childSnapshot.val().destination;
		var dataFirstTrain = childSnapshot.val().firstTrain;
		var dataFrequency = childSnapshot.val().frequency;

		var diffTime = moment().diff(moment.unix(dataFirstTrain), "minutes");
		var timeRemaining = moment().diff(moment.unix(dataFirstTrain), "minutes") % dataFrequency ;
		var minutes = dataFrequency - timeRemaining;

		var nextTrain = moment().add(minutes, "m").format("hh:mm A");



		$("#schedule > tbody").append("<tr><td>" + dataName + "</td><td>" + dataDestination + "</td><td>" + dataFrequency + " mins" + "</td><td>" + nextTrain + "</td><td>" + minutes + "</td></tr>");

	});
