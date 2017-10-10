  var config = {
    apiKey: "AIzaSyBaOw6yySmPoExYlIUQ1DuycK1biFa7K_4",
    authDomain: "employee-data-cf315.firebaseapp.com",
    databaseURL: "https://employee-data-cf315.firebaseio.com",
    projectId: "employee-data-cf315",
    storageBucket: "employee-data-cf315.appspot.com",
    messagingSenderId: "122611134649"
  };
  firebase.initializeApp(config);  

  var database = firebase.database();


  $("#btn-search").on("click", function() {

  	var name = $("#search").val().trim();
  	var destination = $("#destination").val().trim();
  	var firstTrain = $("#time").val().trim();
  	var frequency = $("#min").val().trim();

  var addedTrain = {
  		name: name,
  		destination: destination,
  		fristTrain: firstTrain,
  		frequency: frequency
  	};

  	database.ref().push(addedTrain);

  	alert("Successfully Added!!")

  	$("#search").val("");
  	$("#destination").val("");
  	$("#time").val("");
  	$("#min").val("");

  	return false;

  });

  database.ref().on("child_added", function(childSnapshot) {

  	console.log(childSnapshot.val().name);
  	console.log(childSnapshot.val().destination);
  	console.log(childSnapshot.val().firstTrain);
  	console.log(childSnapshot.val().frequency);


  	var trainName = childSnapshot.val().name;
  	var trainDestination = childSnapshot.val().destination;
  	var trainFirstTime = childSnapshot.val().firstTrain;
  	var trainFrequency = childSnapshot.val().frequency;

  	var trainMinutes;
    var trainArrival;

  	var timeArr = trainFirstTime.split(":");
    var trainTime = moment().hours(timeArr[0]).minutes(timeArr[1]);
    var maxMoment = moment.max(moment(), trainTime);
   
      
      
      if (maxMoment === trainTime) {

        trainArrival = trainTime.format("hh:mm A");

        tMinutes = trainTime.diff(moment(), "minutes");
        
      } else {

        
        var differenceTimes = moment().diff(trainTime, "minutes");
        var trainRemainder = differenceTimes % trainFrequency;
        trainMinutes = trainFrequency - trainRemainder;
        
        trainArrival = moment().add(trainMinutes, "m").format("hh:mm A");
      }
        console.log("tMinutes:", trainMinutes);
        console.log("tArrival:", trainArrival);



  	$("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDestination + "</td><td>" +
          trainFrequency + "</td><td>" + trainArrival + "</td><td>" + trainMinutes + "</td></tr>");
  })