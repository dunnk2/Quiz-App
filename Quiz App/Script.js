"use strict"

/* Features to add:
finished- set correct answers as a property 
- show answers visually at end of quiz, with 5 small pageviews and the users answer marked in red and the correct answer marked in green.
finished- add css transitions. 
finished - make everything centered
finished - add progress bar
- make a bunch of different quizzes and have them choose
finished - change the mouse to a pointer when the user hovers over questions or answers

*/


//global variables

var questionCounter = 0;
var correctCounter = 0;

//var theQuestions = ["What color is the sky at noon?", "In what city is the Bastille located?", "What is the most beautiful state?", "What Holiday is celebrated on July 4?", "How do you complete a quiz app?"];
var questions = [];
var selectedAnswers = [];
var correctAnswers = [];

var protoQuestion = {
    author: "Kyle",
    changeQuestion: function () {
        this["question"] = "testing the change";
    }
};

var QuestionConstructor = function (questionText, A, B, C, D, correctAnswer) {
    var question = questionText;
    var first = A;
    var second = B;
    var third = C;
    var fourth = D;
    var correct = correctAnswer;

    correctAnswers.push(correct);


    this["getQuestion"] = function() {
        return question;
    };
    this["getAns0"] = function() {
        return first;
    };
    this["getAns1"] = function() {
        return second;
    };
    this["getAns2"] = function() {
        return third;
    };
    this["getAns3"] = function() {
        return fourth;
    };

};

QuestionConstructor["prototype"] = protoQuestion;
QuestionConstructor["prototype"]["changeQuestion"] = function (newQuestionText) {
    this.question = newQuestionText;
};



var q1 = new QuestionConstructor("What color is the sky?", "red", "blue", "green", "yellow", 2);
var q2 = new QuestionConstructor("Where is the Bastille located?", "London", "Moscow", "Seoul", "Paris", 4);
var q3 = new QuestionConstructor("What is the most beautiful state?", "New Jersey", "Virginia", "Washington", "Colorado", 3);
var q4 = new QuestionConstructor("What Holiday is celebrated July 4?", "Independence Day", "Halloween", "Easter", "Thanksgiving", 1);
var q5 = new QuestionConstructor("How do you complete a quiz app?", "With great ease", "By using stack overflow", "Through pain and suffering", "By playing flappy bird", 3);
var q6 = new QuestionConstructor("What's the best football team?", "Oregon", "San Francisco", "Seattle Seahawks", "Atlanta Falcons", 3);


//add all the questions to an array
questions.push(q1, q2, q3, q4, q5, q6);

//content wrapper begins hidden and is opened in the first function
document.getElementById("contentWrapper").setAttribute("class", "hide");

//function that changes the question if called
questions[0].changeQuestion("test");

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

    if (questionCounter === questions.length) {
        displayScore();
    }

    //displays the correct question
    document.getElementById("question").innerHTML = questions[questionCounter]['getQuestion']() + "<h6 id='questionAuthor'> By " + questions[questionCounter]["author"] + "</h6>";
    // for loop that loops through each question in an object and creates an li element with the question as the innerhtml
    var answerCounter = 0;
    for (var prop in questions[questionCounter]) {
        if (questions[questionCounter].hasOwnProperty(prop)) {
            if (prop.charAt(3) === "A" && prop.charAt(4) === "n") {
                document.getElementById("question").innerHTML += "<div id='" + answerCounter + "' class='items' onclick='selectedAnswers[" + questionCounter + "] = " + answerCounter + "; giveBorder(" + answerCounter + " ," + questionCounter + ");'>" + questions[questionCounter]['getAns' + answerCounter]() + "</div>";
                answerCounter++;
            }
        }
        
    }

    //check if the question has been answered before. If it has, give the border class to the previously selected ID
    if (selectedAnswers[questionCounter] !== undefined) {
        document.getElementById(selectedAnswers[questionCounter]).className += " selected";
    }

    //Add a progress bar
    document.getElementById("question").innerHTML += "<progress id='progressBar' value='" + questionCounter + "' max='" + questions.length + "'></progress>";

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
        document.getElementById("nextButton").setAttribute("onclick", "displayScore()");
    }

    //calls a display score function if the user has reached the end of the questions
    //if (questionCounter === questions.length) {
    //    displayScore();
    //}
    questionCounter++;
};



var backOne = function () {
    questionCounter = questionCounter - 2;
};

//makes only the clicked item selected
var giveBorder = function (id) {
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
        if (selectedAnswers[i] === (correctAnswers[i] - 1)) {
            correctCounter++;
        }
    }
    
    document.getElementById("question").innerHTML = "You scored " + correctCounter + "/"+ correctAnswers.length +" questions correctly!";
    
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
    questionCounter = 0;
    selectedAnswers = [];
    correctCounter = 0;

};

