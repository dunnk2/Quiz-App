"use strict"

//an array to hold all the questions
var answers = [];
var questionCounter = 0;
var correctCounter = 0;

// right now the questions are listed 
var theQuestions = ["What color is the sky at noon?", "In what city is the Bastille located?", "What is the most beautiful state?", "What Holiday is celebrated on July 4?", "How do you complete a quiz app?"];

//The possible answers to each question are given in an objects
//correct answers at position 1, 3, 2, 0 3

var q1 = {};
q1["A"] = "red";
q1["B"] = "blue";
q1["C"] = "green";
q1["D"] = "yellow";


var q2 = {};
q2["A"] = "London";
q2["B"] = "Moscow";
q2["C"] = "Seoul";
q2["D"] = "Paris";


var q3 = {};
q3["A"] = "Maryland";
q3["B"] = "New Mexico";
q3["C"] = "Washington";
q3["D"] = "Kansas";


var q4 = {};
q4["A"] = "Independence Day";
q4["B"] = "Halloween";
q4["C"] = "Easter";
q4["D"] = "Thanksgiving";


var q5 = {};
q5["A"] = "With great ease.";
q5["B"] = "By using stack overflow.";
q5["C"] = "Through pain and suffering.";
q5["D"] = "By playing flappy bird.";

//add all the answers to an array
answers.push(q1, q2, q3, q4, q5);

//function that is called when the start button is clicked.
var first = function () {
    //hides the begin quiz button
    var beginQuiz = document.getElementById("start");
    beginQuiz.setAttribute("class", "hide");

    //shows the paragraph that asks the question
    document.getElementById("question").setAttribute("class", "");

    //calls the question function that will display the answers
    displayQuestion();
};

//function that displays each question
var displayQuestion = function () {
    "use strict";
    //get the element and set inner html to the current question property of the position in the array that currentCounter is at
    document.getElementById("answersList").innerHTML = ("");
    document.getElementById("question").innerHTML = theQuestions[questionCounter];

    // for loop that loops through each question in an object and creates an li element with the question as the innerhtml
    var answerCounter = 0;
    for (var prop in answers[questionCounter]) {
        document.getElementById("answersList").innerHTML += "<li id='" + answerCounter + "'' onclick='informResult(" + questionCounter + ", " + answerCounter + ")'>" + answers[questionCounter][prop] + "</li>";
        answerCounter++
    }

    //creates "next" button
    document.getElementById("answersList").innerHTML += "<button id='nextButton'onclick='displayQuestion();'>Click for next question</button>";

    //changes "next" button to display "see your score" when user has reached last question
    if (questionCounter === theQuestions.length - 1) {
        document.getElementById("nextButton").innerHTML = "See your score!";
    }

    //calls a display score function  if the user has reached the end of the questions
    if (questionCounter === theQuestions.length) {
        displayScore();
    }
    questionCounter++;
};

//This function takes in the question number and the id of the answer the user selected. It alerts the user if the answer is correct or not.
var informResult = function (question, answerId) {
    "use strict";
    
    document.getElementById("nextButton").setAttribute("onclick", '"displayScore()"')
    var correct = "You are correct! Try the next question."
    var incorrect = "That answer is incorrect. Please move on to the next question.";
    if (question === 0) {
        if (answerId === 1) {
            alert(correct);
            correctCounter++;
        } else {
            alert(incorrect);
        }
    } else if (question === 1) {
        if (answerId === 3)  { 
            alert(correct);
            correctCounter++;
        } else {
            alert(incorrect);
        }
    } else if (question === 2) {
        if (answerId === 2)  { 
            alert(correct);
            correctCounter++;
        } else {
            alert(incorrect);
        }
    } else if (question === 3) {
        if (answerId === 0)  { 
            alert(correct);
            correctCounter++;
        } else {
            alert(incorrect);
        }
    } else if (question === 4) {
        if (answerId === 2) {
            alert(correct);
            correctCounter++;
        } else {
            alert(incorrect)
        };
    } else {
        alert("That answer is incorrect. Move on to the next question");
    }



};

// displays the users score 
var displayScore = function () {
    "use strict";

    document.getElementById("question").innerHTML = "You scored " + correctCounter + "/5 questions correctly!";
    document.getElementById("answersList").innerHTML = ("");
};


