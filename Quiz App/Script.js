"use strict"

/* Features to add:
- show answers visually at end of quiz, with 5 small pageviews and the users answer marked in red and the correct answer marked in green.
- add css transitions. 
finished - make everything centered
finished - add progress bar
- make a bunch of different quizzes and have a choose 
- change the mouse to a pointer when the user hovers over questions or answers

*/


//an array to hold all the questions
var answers = [];
var questionCounter = 0;
var selectedAnswers = [];
var correctAnswers = [1, 3, 2, 0, 2];
var correctCounter = 0;

// right now the questions are listed 
var theQuestions = ["What color is the sky at noon?", "In what city is the Bastille located?", "What is the most beautiful state?", "What Holiday is celebrated on July 4?", "How do you complete a quiz app?"];

//The possible answers to each question are given in an objects
//correct answers at position 1, 3, 2, 0, 3

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

//content wrapper begins hidden and is opened in the first function
document.getElementById("contentWrapper").setAttribute("class", "hide");

//function that is called when the start button is clicked.
var first = function () {
    //hides the begin quiz button
    var beginQuiz = document.getElementById("start");
    beginQuiz.setAttribute("class", "hide");

    //unhide the contentwrapper
    document.getElementById("contentWrapper").setAttribute("class", "");

    //shows the paragraph that asks the question
    document.getElementById("question").setAttribute("class", "");



    //calls the question function that will display the answers
    displayQuestion();
};

//function that displays each question
var displayQuestion = function () {
    "use strict";
    //get the element and set inner html to the current question property of the position in the array that currentCounter is at
    //document.getElementsByClassName("items").
    document.getElementById("question").innerHTML = theQuestions[questionCounter];

    // for loop that loops through each question in an object and creates an li element with the question as the innerhtml
    var answerCounter = 0;
    for (var prop in answers[questionCounter]) {
        document.getElementById("question").innerHTML += "<div id='" + answerCounter + "' class='items' onclick='selectedAnswers[" + questionCounter + "] = " + answerCounter + "; giveBorder(" + answerCounter + " ," + questionCounter + ");'>" + answers[questionCounter][prop] + "</div>";
        answerCounter++;
    }

    //check if the question has been answered before. If it has, give the border class to the previously selected ID
    if (questionCounter >= 0) {
        if (selectedAnswers[questionCounter] !== undefined) {
            document.getElementById(selectedAnswers[questionCounter]).className += " selected";
        }
    }

    //Add a progress bar
    document.getElementById("question").innerHTML += "<progress id='progressBar' value='" + questionCounter + "' max='5'></progress>";

    //creates previous button and disables it until the user has reached the second question.
    document.getElementById("question").innerHTML += "<button id='previousButton' onclick=' backOne(); displayQuestion();'>Previous</button>";
    if (questionCounter === 0) {
        document.getElementById("previousButton").setAttribute("onclick", "");
    }

    //creates "next" button
    document.getElementById("question").innerHTML += "<button id='nextButton' onclick='displayQuestion();' >Next</button>";
    

    //changes "next" button to display "see your score" when user has reached last question
    if (questionCounter === theQuestions.length - 1) {
        document.getElementById("nextButton").innerHTML = "See your score!";
    }

    //calls a display score function if the user has reached the end of the questions
    if (questionCounter === theQuestions.length) {
        displayScore();
    }
    questionCounter++;
};

var backOne = function () {
    questionCounter = questionCounter - 2;
};

//makes only the clicked item selected
var giveBorder = function (id, question) {
    "use strict";
    var liItems = document.getElementsByClassName("items");

    for (var i = 0; i < liItems.length; i++) {
        liItems[i].className = "items";
    }
    document.getElementById(id).className += " selected";
};


// displays the users score 
var displayScore = function () {
    "use strict";
    for (var i = 0; i < selectedAnswers.length; i++) {
        if (selectedAnswers[i] === correctAnswers[i]) {
            correctCounter++;
        }
    }
    
    document.getElementById("question").innerHTML = "You scored " + correctCounter + "/5 questions correctly!";
    
    switch (correctCounter) {
        case 0:
            document.getElementById("question").innerHTML += "<img id='resultImage' src='images/0.gif' />";
            break; 
        case 1:
            document.getElementById("question").innerHTML += "<img id='resultImage' src='images/1.gif' />";
            break;
        case 2:
            document.getElementById("question").innerHTML += "<img id='resultImage' src='images/2.gif' />";
            break;
        case 3:
            document.getElementById("question").innerHTML += "<img id='resultImage' src='images/3.gif' />";
            break;
        case 4:
            document.getElementById("question").innerHTML += "<img id='resultImage' src='images/4.gif' />";
            break;
        case 5:
            document.getElementById("question").innerHTML += "<img id='resultImage' src='images/5.gif' />";
            break;
    }

    document.getElementById("question").innerHTML += "<button id='retakeButton' onclick='displayQuestion();'>Retake the quiz</button>";
    questionCounter = -1;
    selectedAnswers = [];
    correctCounter = 0;

};

