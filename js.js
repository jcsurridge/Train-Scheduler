$(document).ready(function () {
    // Your web app's Firebase configuration
    var firebaseConfig = {
        apiKey: "AIzaSyDqOXr-2xRcPvwway9BlgQSYQ7FgztEnio",
        authDomain: "scheduler-c7ddf.firebaseapp.com",
        databaseURL: "https://scheduler-c7ddf.firebaseio.com",
        projectId: "scheduler-c7ddf",
        storageBucket: "",
        messagingSenderId: "704256300167",
        appId: "1:704256300167:web:fdcaf7916789673c5a5422"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    let database = firebase.database();
    let destination;
    let train;
    let frequency;
    let time;
    
    function createRow() {
        database.ref("/train").on("child_added", function (snapshot) {
            //console.log(snapshot.val())
            let tableRow = $("<tr>");
            let tableCellOne = $("<td>");
            let tableCellTwo = $("<td>");
            let tableCellThree = $("<td>");
            let tableCellFour = $("<td>");
            let tableCellFive = $("<td>");
            tableCellOne.attr("id", "train-name");
            tableCellTwo.attr("id", "destination-name");
            tableCellThree.attr("id", "frequency-min");
            tableCellFour.attr("id", "next-arrival");
            tableCellFive.attr("id", "minutes-away");
            tableRow.append(tableCellOne);
            tableRow.append(tableCellTwo);
            tableRow.append(tableCellThree);
            tableRow.append(tableCellFour);
            tableRow.append(tableCellFive);
            $("#tbody").append(tableRow);
           
            var trainTime = moment(time).startOf('hour').fromNow();
            console.log(trainTime);
            var currentTime = moment().format('MMMM Do YYYY, h:mm:ss a');
            console.log(currentTime);
            

            let snapshotValue = snapshot.val();
            tableCellOne.text(snapshotValue.destination);
            tableCellTwo.text(snapshotValue.train);
            tableCellThree.text(snapshotValue.frequency);
            tableCellFour.text(snapshotValue.time);
            tableCellFive.text(snapshotValue.convertedTime);

        })
    }


    $("#submit").on("click", function () {
        // console.log("working click!")
        destination = $("#destination").val().trim();
        train = $("#train").val().trim();
        frequency = $("#frequency").val();
        time = $("#time").val();
        database
            .ref("/train")
            .push({
                destination: destination,
                train: train,
                frequency: frequency,
                time: time
            })
    });
    createRow();
});


