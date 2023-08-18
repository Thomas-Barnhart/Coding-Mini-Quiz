    var welcome = document.querySelector("#introduction");
    var startBtn = document.querySelector("#start-button");
    var introPage =document.querySelector("#intro-page");
    
    var questionPage = document.querySelector("#question-page");
    var askQuestion = document.querySelector("#ask-question");
    
    var reactButtons = document.querySelectorAll(".choices");
    var answerBtn1 = document.querySelector("#answer-btn1");
    var answerBtn2 = document.querySelector("#answer-btn2");
    var answerBtn3 = document.querySelector("#answer-btn3");
    var answerBtn4 = document.querySelector("#answer-btn4");
    
    var checkLine = document.querySelector("#check-line");
    var scoreBoard = document.querySelector("#submit-page");
    var finalScore = document.querySelector("#final-score");
    var userInitial =document.querySelector("#initial");
    
    var submitBtn = document.querySelector("#submit-btn");
    var highScorePage = document.querySelector("#highscore-page");
    var scoreRecord = document.querySelector("#score-record");
    var scoreCheck = document.querySelector("#score-check");
    var finish = document.querySelector("#finish");
    
    var backBtn = document.querySelector("#back-btn");
    var clearBtn = document.querySelector("#clear-btn");
    
    var questionSource = [
        {
            question: "Question 1 : What does the acronym 'HTML' stand for?",
            choices: ["a. HyperText Markup Language", "b. HighText Machine Language", "c. HyperTransfer Markup Language", "d. HyperTech Machine Language"],
            answer: "a"
        },
        {
            question: "Question 2 : Which CSS property is used to control the spacing between individual letters in a text?",
            choices: ["a. letter-spacing", "b. word-spacing", "c. text-spacing", "d. character-spacing"],
            answer: "a"
        },
        {
            question: "Question 3 : Which keyword is used to declare a function in JavaScript?",
            choices: ["a. func", "b. method", "c. function", "d. def"],
            answer: "c"
        },
        {
            question: "Question 4 : What is the correct HTML tag for inserting a line break?",
            choices: ["a. <lb>", "b.  <linebreak>", "c. <br>", "d. <break>"],
            answer: "c"
        },
        {
            question: "Question 5 : Which CSS selector targets elements with the class 'highlight'?",
            choices: ["a. .highlight", "b. #highlight", "c. highlight", "d. *highlight"],
            answer: "a"
        },
        {
            question: "Question 6 : Which built-in function can be used to parse a string and convert it into an integer?",
            choices: ["a. parseInteger()", "b. toInteger()", "c. parseInt()", "d. convertInt()"],
            answer: "c"
        },
        {
            question: "Question 7 : Which HTML element is used to create an ordered list?",
            choices: ["a. <ul>", "b. <li>", "c. <dl>", "d. <ol>"],
            answer: "d"
        },
        {
            question: "Question 8 : How can you include an external CSS file named 'styles.css' in your HTML document?",
            choices: ["a. <style src='styles.css'>", "b.  <link rel='stylesheet' href='styles.css'>", "c. <css href='styles.css'>", "d. <stylesheet>styles.css</stylesheet>"],
            answer: "b"
        },
        {
            question: "Question 9 : What will the following code output: console.log(2 + '2');",
            choices: ["a. 22", "b. 4", "c. '22'", "d. 2 + '2'"],
            answer: "c"
        },
        {
            question: "Question 10 : Which HTML tag is used to embed JavaScript code directly within an HTML document?",
            choices: ["a. <java>", "b. <javascript>", "c. <script>", "d. <js>"],
            answer: "c"
        },
    ];
    var timeLeft = document.getElementById("timer");
    var secondsLeft = 60;
    var questionNumber = 0;
    var totalScore = 0;
    var questionCount = 1;
    function countdown() {
            var timerInterval = setInterval(function () {
              secondsLeft--;
              timeLeft.textContent = "Time left: " + secondsLeft + " s";
                if (secondsLeft <= 0){
                    clearInterval(timerInterval);
                    timeLeft.textContent = "Time is up!"; 
                    finish.textContent = "Time is up!";
                    gameOver();
                } else  if(questionCount >= questionSource.length +1) {
                    clearInterval(timerInterval);
                    gameOver();
                    } 
        }, 1000);
    }
    function startQuiz () {
            introPage.style.display = "none";
            questionPage.style.display = "block";
            questionNumber = 0
            countdown();
            showQuestion(questionNumber);
    }
    function showQuestion (n) {
            askQuestion.textContent = questionSource[n].question;
            answerBtn1.textContent = questionSource[n].choices[0];
            answerBtn2.textContent = questionSource[n].choices[1];
            answerBtn3.textContent = questionSource[n].choices[2];
            answerBtn4.textContent = questionSource[n].choices[3];
            questionNumber = n;
        }
    function checkAnswer(event) {
        event.preventDefault();
        checkLine.style.display = "block";
        setTimeout(function () {
            checkLine.style.display = 'none';
        }, 1000);
        if (questionSource[questionNumber].answer == event.target.value) {
            checkLine.textContent = "Correct!"; 
            totalScore = totalScore + 1;
        } else {
            secondsLeft = secondsLeft - 10;
            checkLine.textContent = "Wrong! The correct answer is " + questionSource[questionNumber].answer + " .";
        }
        if (questionNumber < questionSource.length -1 ) {
            showQuestion(questionNumber +1);
        } else {
        gameOver();}
        questionCount++;
    }
    function gameOver() {
            questionPage.style.display = "none";
            scoreBoard.style.display = "block";
            console.log(scoreBoard);
            finalScore.textContent = "Your final score is :" + totalScore ;
            timeLeft.style.display = "none"; 
    };
    function getScore () {
        var currentList =localStorage.getItem("ScoreList");
        if (currentList !== null ){
            freshList = JSON.parse(currentList);
            return freshList;
        } else {
            freshList = [];
        }
        return freshList;
    };
    function renderScore () {
        scoreRecord.innerHTML = "";
        scoreRecord.style.display ="block";
        var highScores = sort();   
        var topFive = highScores.slice(0,5);
        for (var i = 0; i < topFive.length; i++) {
            var item = topFive[i];
        var li = document.createElement("li");
        li.textContent = item.user + " - " + item.score;
        li.setAttribute("data-index", i);
        scoreRecord.appendChild(li);
        }
    };
    function sort () {
        var unsortedList = getScore();
        if (getScore == null ){
            return;
        } else{
        unsortedList.sort(function(a,b){
            return b.score - a.score;
        })
        return unsortedList;
    }};
    function addItem (n) {
        var addedList = getScore();
        addedList.push(n);
        localStorage.setItem("ScoreList", JSON.stringify(addedList));
    };
    function saveScore () {
        var scoreItem = {
            user: userInitial.value,
            score: totalScore
        }
        addItem(scoreItem);
        renderScore();
    }
    startBtn.addEventListener("click", startQuiz);
    reactButtons.forEach(function(click){
        click.addEventListener("click", checkAnswer);
    });
    submitBtn.addEventListener("click", function(event) {
        event.preventDefault();
        scoreBoard.style.display = "none";
        introPage.style.display = "none";
        highScorePage.style.display = "block";
        questionPage.style.display ="none";
        saveScore();
    });
    scoreCheck.addEventListener("click", function(event) {
        event.preventDefault();
        scoreBoard.style.display = "none";
        introPage.style.display = "none";
        highScorePage.style.display = "block";
        questionPage.style.display ="none";
        renderScore();
    });
    backBtn.addEventListener("click",function(event){
            event.preventDefault();
            scoreBoard.style.display = "none";
            introPage.style.display = "block";
            highScorePage.style.display = "none";
            questionPage.style.display ="none";
            location.reload();
    });
    clearBtn.addEventListener("click",function(event) {
        event.preventDefault();
        localStorage.clear();
        renderScore();
    });