

  document.addEventListener("DOMContentLoaded", function () {
  
      // Global variables
      var startButton = document.getElementById("start");
      var questionBox = document.getElementById("questions");
      var choicesBox = document.getElementById("choices");
      var feedbackBox = document.getElementById("feedback");
      var timeDisplay = document.getElementById("time");
      var finalScoreDisplay = document.getElementById("final-score");
      var initialsInput = document.getElementById("initials");
      var submitButton = document.getElementById("submit");
      
    
      var currentIndex = 0;
      var score = 0;
      var timeLeft = 60; 
    
      function showQuestion() {
        var currentQuestion = questions[currentIndex];
    
        // Display the question title
        document.getElementById("question-title").textContent = currentQuestion.question;
    
        // Display the choices
        choicesBox.textContent = "";
        for (var i = 0; i < currentQuestion.choices.length; i++) {
          var choiceButton = document.createElement("button");
          choiceButton.textContent = currentQuestion.choices[i];
          choiceButton.addEventListener("click", checkAnswer);
          choicesBox.appendChild(choiceButton);
        }
  
      }
    
    
      function startQuiz() {
        // Hide the start screen and show the questions
        document.getElementById("start-screen").classList.add("hide");
        questionBox.classList.remove("hide");
    
        // Display the first question
        showQuestion();
    
        // Start the timer
        startTimer();
      }
    
    
  
    function checkAnswer(event) {
    
      var selectedAnswer = event.target.textContent;
      var currentQuestion = questions[currentIndex];
  
      // Check if the selected answer is correct
      if (selectedAnswer === currentQuestion.correctAnswer) {
        var correctSound = document.getElementById("correctSound");
        correctSound.play();
        feedbackBox.textContent = "Correct!";
      
        score++;
        feedbackBox.classList.remove("hide");
      } else {
        var incorrectSound = document.getElementById("incorrectSound");
        incorrectSound.play();
        feedbackBox.textContent = "Wrong! -10 seconds";
        timeLeft -= 10;
        
      }
  
      // Move to the next question or end the quiz
      currentIndex++;
      if (currentIndex < questions.length) {
        showQuestion();
      } else {
        endQuiz();
      }
    }
  
    function endQuiz() {
      clearInterval(timer);
  
      document.getElementById("end-screen").classList.remove("hide");
      document.getElementById("start-screen").classList.add("hide");
      questionBox.classList.add("hide");
      feedbackBox.textContent = "";
      finalScoreDisplay.textContent = score;
  
      submitButton.addEventListener("click", function () {
        var initials = initialsInput.value;
        var highScoreList = document.getElementById("highscore");
        
        // Create a new list item
        var newHighScore = document.createElement("li");
        newHighScore.textContent = `${initials} : ${score}`;

        // Append the new high score to the high score list
        highScoreList.appendChild(newHighScore);
    });
    }
  
    function startTimer() {
      timer = setInterval(function () {
        timeLeft--;
        timeDisplay.textContent = timeLeft;
  
        if (timeLeft <= 0) {
          clearInterval(timer);
          endQuiz();
        }
      }, 1000);
    }
    // Event listener for the start button
    startButton.addEventListener("click", startQuiz);
    
  
  });
  



