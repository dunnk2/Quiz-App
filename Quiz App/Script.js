"use strict"

/* Features to add:
- show answers visually at end of quiz, with 5 small pageviews and the users answer marked in red and the correct answer marked in green.
- add css transitions. 
finished - make everything centered
finished - add progress bar
- make a bunch of different quizzes and have them choose
finished - change the mouse to a pointer when the user hovers over questions or answers

*/


//an array to hold all the questions
var questions = [];
var questionCounter = 0;
var selectedAnswers = [];
var correctAnswers = [1, 3, 2, 0, 2];
var correctCounter = 0;

var protoQuestion = {
    Author: "Kyle",
    changeQuestion: function (newQuestionText) {
        this.Question = newQuestionText;
    }
}


//The possible questions to each question are given in an objects
//correct answers at position 1, 3, 2, 0, 3

var q1 = Object.create(protoQuestion);
q1["Question"] = "What color is the sky at noon?";
q1["ans1"] = "red";
q1["ans2"] = "blue";
q1["ans3"] = "green";
q1["ans4"] = "yellow";


var q2 = Object.create(protoQuestion);
q2["Question"] = "In what city is the Bastille located?";
q2["ans1"] = "London";
q2["ans2"] = "Moscow";
q2["ans3"] = "Seoul";
q2["ans4"] = "Paris";


var q3 = Object.create(protoQuestion);
q3["Question"] = "What is the most beautiful state?";
q3["ans1"] = "Maryland";
q3["ans2"] = "New Mexico";
q3["ans3"] = "Washington";
q3["ans4"] = "Kansas";


var q4 = Object.create(protoQuestion);
q4["Question"] = "What Holiday is celebrated on July 4?"
q4["ans1"] = "Independence Day";
q4["ans2"] = "Halloween";
q4["ans3"] = "Easter";
q4["ans4"] = "Thanksgiving";


var q5 = Object.create(protoQuestion);
q5["Question"] = "How do you complete a quiz app?"
q5["ans1"] = "With great ease.";
q5["ans2"] = "By using stack overflow.";
q5["ans3"] = "Through pain and suffering.";
q5["ans4"] = "By playing flappy bird.";

//add all the answers to an array
questions.push(q1, q2, q3, q4, q5);

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



    //calls the question function that will display the questions
    displayQuestion();
};

//function that displays each question
var displayQuestion = function () {
    "use strict";

    document.getElementById("question").innerHTML = questions[questionCounter]["Question"];

    // for loop that loops through each question in an object and creates an li element with the question as the innerhtml


    document.getElementById("question").innerHTML += "<div>by "+ questions[questionCounter]["Author"] +" </div>";

    for (var i = 0; i < 4; i++) {
        document.getElementById("question").innerHTML += "<div id='" + i + "' class='items' onclick='selectedAnswers[" + questionCounter + "] = " + i + "; giveBorder(" + i + " ," + questionCounter + ");'>" + questions[questionCounter]["ans" + (i+1)] + "</div>";
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
    if (questionCounter === questions.length - 1) {
        document.getElementById("nextButton").innerHTML = "See your score!";
    }

    //calls a display score function if the user has reached the end of the questions
    if (questionCounter === questions.length) {
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

