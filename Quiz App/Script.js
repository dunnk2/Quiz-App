"use strict"

/* Features to add:
- add create question functionality
- add multiple quiz functionality
- change the gif results to being percentage based instead of counter based. 
*/


//global variables. I have two counters and four arrays.

var questionCounter = 0;
var correctCounter = 0;
var createQuestionCounter = 0;
var numOfQuiz = 0;
var questions = [];
var selectedAnswers = [];
var correctAnswers = [];
var userCreatedQuestions = [];
var quizzes = [];



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

//creates prototype object, statement beneath object assigns it as QuestionConstructors prototype
var protoQuestion = {
    author: "Kyle",
    changeQuestion: function () {
        this["question"] = "testing the change";
    }
};
QuestionConstructor["prototype"] = protoQuestion;


// creating our questions using the question constructor
var q1 = new QuestionConstructor("What color is the sky?", "red", "blue", "green", "yellow", 2);
var q2 = new QuestionConstructor("Where is the Bastille located?", "London", "Moscow", "Seoul", "Paris", 4);
var q3 = new QuestionConstructor("What is the most beautiful state?", "New Jersey", "Virginia", "Washington", "Colorado", 3);
var q4 = new QuestionConstructor("What Holiday is celebrated July 4?", "Independence Day", "Halloween", "Easter", "Thanksgiving", 1);
var q5 = new QuestionConstructor("How do you complete a quiz app?", "With great ease", "By using stack overflow", "Through pain and suffering", "By playing flappy bird", 3);
var q6 = new QuestionConstructor("What's the best football team?", "Oregon", "San Francisco", "Seattle Seahawks", "Atlanta Falcons", 3);

//add all the questions to an array
questions.push(q1, q2, q3, q4, q5, q6);

quizzes.push(questions);

//check for local store\age
/*
if (localStorage) {
    localStorage.setItem("q1", new QuestionConstructor("What color is the sky?", "red", "blue", "green", "yellow", 2));
    localStorage.setItem("q2", new QuestionConstructor("Where is the Bastille located?", "London", "Moscow", "Seoul", "Paris", 4));
    localStorage.setItem("q3", new QuestionConstructor("What is the most beautiful state?", "New Jersey", "Virginia", "Washington", "Colorado", 3));
    localStorage.setItem("q4", new QuestionConstructor("What Holiday is celebrated July 4?", "Independence Day", "Halloween", "Easter", "Thanksgiving", 1));
    localStorage.setItem("q5", new QuestionConstructor("How do you complete a quiz app?", "With great ease", "By using stack overflow", "Through pain and suffering", "By playing flappy bird", 3));
    localStorage.setItem("q6", new QuestionConstructor("What's the best football team?", "Oregon", "San Francisco", "Seattle Seahawks", "Atlanta Falcons", 3));
} else {
    alert("You're browser is not supported!")
}
*/

//content wrapper begins hidden and is opened in the first function
document.getElementById("contentWrapper").setAttribute("class", "hide");

//function that changes the question if called
//questions[0].changeQuestion("test");

//function that is called when the start button is clicked.
var first = function (path) {
    //hides the take quiz button
    var beginQuiz = document.getElementById("takeQuiz");
    beginQuiz.setAttribute("class", "hide");

    var beginQuiz = document.getElementById("createQuiz");
    beginQuiz.setAttribute("class", "hide");

    //unhide the contentwrapper
    document.getElementById("contentWrapper").setAttribute("class", "");

    //shows the paragraph that asks the question
    document.getElementById("question").setAttribute("class", "");

    //calls the question function that will display the answers
    //need to change the take path condition here to execute a display quizzes option,
    //if (path === "take") {
    //    displayQuestion();
    //} else if (path === "create") {
    //    createQuestion();
    //}
    if (path === "take") {
        displayQuizzes();
    } else if (path === "create") {
        createQuestion();
    }
};

//displays quizzes
var displayQuizzes = function () {
    for (var i = 0; i < quizzes.length; i++) {
        //How do I get displayquestion to operate on the right quiz every time? I could try using a global variable. Passing something to displayquestion won't work, since 
        document.getElementById("question").innerHTML += "<div class='quizzesDisplayed' onclick='displayQuestion(" + i + ");'>Quiz " + i + " </div>";
    }
};

//function that displays input fields to create questions
var createQuestion = function () {
    //var createQuestionCounter = 0;
    document.getElementById("question").innerHTML = "";
    document.getElementById("question").innerHTML +=
        "<div id='createQuestionHead'>Create Question " + (createQuestionCounter + 1) + "</div>"
        + "<br />" + "<p class='creators' > Question: " + "<textarea id='newQuestion' name='newQ' cols='20' rows='4'/>Enter your question</textarea>" + "</p>"
        + "<br />" + "<p class='creators'> Answer 1: " + "<input id='userAns1' type='text' name='ans1' size='15' maxlength='30' />" + "</p>"
        + "<br />" + "<p class='creators'> Answer 2: " + "<input id='userAns2' type='text' name='ans2' size='15' maxlength='30' />" + "</p>"
        + "<br />" + "<p class='creators'> Answer 3: " + "<input id='userAns3' type='text' name='ans3' size='15' maxlength='30' />" + "</p>"
        + "<br />" + "<p class='creators'> Answer 4" + "<input id='userAns4' type='text' name='ans4' size='15' maxlength='30' />" + "</p>"
        + "<br />" + "<p class='creators'> Correct Answer" + "<input id='newCorrect' type='text' name='ans4' size='15' maxlength='30' />" + "</p>"
        + "<button id='nextOne' onclick='createNext();'>Create next question</button>"
        + "<button id='finishQuiz' onclick='finishQuiz();'>Finish your quiz</button>";

};

//this function needs to grab the values from the array and store them in an object which will get pushed into an array
var createNext = function () {

    var userQuestion = document.getElementById("newQuestion").value;
    var answer1 = document.getElementById("userAns1").value;
    var answer2 = document.getElementById("userAns2").value;
    var answer3 = document.getElementById("userAns3").value;
    var answer4 = document.getElementById("userAns4").value;
    var usersCorrect = document.getElementById("newCorrect").value;

    //pushes the users question into an array of the users questions.
    userCreatedQuestions.push(new QuestionConstructor(userQuestion, answer1, answer2, answer3, answer4, usersCorrect));
    createQuestionCounter++;
    createQuestion();
};

var finishQuiz = function () {
    document.getElementById("question").innerHTML = "";
    document.getElementById("contentWrapper").className = "hide";
    document.getElementById("takeQuiz").className = "";
    document.getElementById("createQuiz").className = "";
    quizzes.push(userCreatedQuestions);
};
//function that displays each question. 
var displayQuestion = function (quizNumber) {
    "use strict";
    if (quizNumber !== undefined) {
        numOfQuiz = quizNumber;
    } else {
        numOfQuiz = 0;
    }


    if (questionCounter === quizzes[numOfQuiz].length) {
        displayScore();
    }

    //displays the correct question
    document.getElementById("question").innerHTML = quizzes[numOfQuiz][questionCounter]['getQuestion']() + "<h6 id='questionAuthor'> By " + quizzes[numOfQuiz][questionCounter]["author"] + "</h6>";
    // for loop that loops through each question in an object and creates an li element with the question as the innerhtml
    var answerCounter = 0;
    for (var prop in quizzes[numOfQuiz][questionCounter]) {
        if (quizzes[numOfQuiz][questionCounter].hasOwnProperty(prop)) {
            if (prop.charAt(3) === "A" && prop.charAt(4) === "n") {
                document.getElementById("question").innerHTML += "<div id='" + answerCounter + "' class='items' onclick='selectedAnswers[" + questionCounter + "] = " + answerCounter + "; giveBorder(" + answerCounter + " ," + questionCounter + ");'>" + quizzes[numOfQuiz][questionCounter]['getAns' + answerCounter]() + "</div>";
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
    if (questionCounter === quizzes[numOfQuiz].length - 1) {
        document.getElementById("nextButton").innerHTML = "See your score!";
        document.getElementById("nextButton").setAttribute("onclick", "displayScore()");
    }

    //calls a display score function if the user has reached the end of the questions
    //if (questionCounter === questions.length) {
    //    displayScore();
    //}
    questionCounter++;
};


// resets questionCounter so quiz can begin again
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

//alert(quizzes[0].length);