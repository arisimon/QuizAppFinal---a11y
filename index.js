$(function() {

    'use strict';

    let questionNumber = 0;
    let score = 0;

    function bindEventListeners() {
        renderQuestion();
        beginQuiz();
    }

    //generate new question
    function generateQuestion() {
        if (questionNumber < STORE.length) {
            console.log('question generated');
            return `
            <div class="question-${questionNumber}" >
                <h2>${STORE[questionNumber].question}</h2>
                <form class="quiz-main">
                    <fieldset>
                        <legend style="display: none">${STORE[questionNumber].question}</legend>
                        <label class="answerChoice">
                        <div>
                            <input type="radio" value="${STORE[questionNumber].answers[0]}" class="option-input radio" name="answer" required>
                            <span>${STORE[questionNumber].answers[0]}</span>
                        </div>
                        </label>
                        <label class="answerChoice">
                            <div>
                            <input type="radio" value="${STORE[questionNumber].answers[1]}" class="option-input radio" name="answer" required>
                            <span>${STORE[questionNumber].answers[1]}</span>
                            </div>
                        </label>
                        <label class="answerChoice">
                            <div>
                            <input type="radio" value="${STORE[questionNumber].answers[2]}" class="option-input radio" name="answer" required>
                            <span>${STORE[questionNumber].answers[2]}</span>
                            </div>
                        </label>
                        <label class="answerChoice">
                            <div>
                            <input type="radio" value="${STORE[questionNumber].answers[3]}" class="option-input radio" name="answer" required>
                            <span>${STORE[questionNumber].answers[3]}</span>
                            </div>
                        </label>
                    </fieldset>
                <div class="button-container">
                    <div class="submit-btn">
                        <button type="submit" class="js-submit-button">Submit</button>
                    </div>
                    <div class="restart-btn">
                        <button type="button" class="js-restart-button">Restart Quiz</button>
                    </div>
                </div>      
                </form>
            </div>
            `;
        } else {
            renderResults();
            $('.questionNumber').text(10);
        }
    }

    //render question in DOM 
    function renderQuestion() {
        $('.questionForm').html(generateQuestion);
        handleFormSubmit();
        handleRestart();
    }

    //user selects answer, quiz responds
    function handleFormSubmit() {
        $('.quiz-main').on('submit', function(event) {
            event.preventDefault();
            const userAnswer = $('input:checked');
            const userAnswerValue = userAnswer.val();

            checkUserAnswer(userAnswerValue);
            //incrementQuestion();
            console.log('successful form submission')
        });
    }

    //checks user answer 
    function checkUserAnswer(answer) {
        let correctAnswer = `${STORE[questionNumber].correctAnswer}`;
        if (answer === correctAnswer) {
            console.log('answer correct');
            feedbackCorrect();
            incrementScore();
        } else {
            console.log('answer wrong');
            feedbackWrong(correctAnswer);
        }
        renderNextQuestion();
        handleRestart();
    }

    //increment question number
    function incrementQuestion() {
        questionNumber++;
        console.log(questionNumber);
        $('.questionNumber').text(questionNumber + 1);
        console.log('question number incremented')
    }

    //increment score
    function incrementScore() {
        score++;
        $('.score').text(score);
        console.log('score incremented')
    }

    //feedback if user answer is correct
    function feedbackCorrect(explanation) {
        $('.questionForm').html(`
            <div class="correctFeedback">
                <h2><b>That's correct!</b></h2>
                <p>${STORE[questionNumber].explanation}</p>
                <div class="button-container">
                    <div class="submit-btn2">
                        <button type="button" class="js-next-button">Next</button>
                    </div>
                    <div class="restart-btn">
                        <button type="button" class="js-restart-button">Restart</button>
                    </div>
                </div>
            </div>
        `);      
    }

    //feedback if user answer is wrong
    function feedbackWrong(correctAnswer, explanation) {
        $('.questionForm').html(`
            <div class="wrongFeedback">
                <h2><b>You got it wrong!</b></h2>
                <h2>The correct answer is <span class="answer">${correctAnswer}</span></h2>
                <p>${STORE[questionNumber].explanation}</p>
                <div class="button-container">
                    <div class="submit-btn2">
                        <button type="button" class="js-next-button">Next</button>
                    </div>
                    <div class="restart-btn">
                        <button type="button" class="js-restart-button">Restart</button>
                    </div>
                </div>
            </div>
        `);
    }

    //begin the quiz, hide beginning div and show quiz form
    function beginQuiz() {
        $('.start-quiz').on('click', 'button', (function(event) {
            $('.row').remove();
            $('.questionForm').css('display', 'block');
            $('.js-hide-score').show();
            $('.questionNumber').text(1);
            console.log('quiz successfully started');
        }));
    }

    //render next question
    function renderNextQuestion() {
        $('.submit-btn2').on('click', '.js-next-button' , function(event) {
            event.preventDefault();
            console.log('next question button clicked');

            if (questionNumber < STORE.length) {
                incrementQuestion();
                renderQuestion();
            } else {
                renderResults();
            }

        });
    }

    //results page when done with quiz
    function renderResults() {
        if (score >= 8) {
            $('.questionForm').html(`<div class="results feedbackCorrect"><h3>You're a true Toffee fan!</h3>
          <p>Your score is ${score} / 10</p><h4>Come on you Blues!</h4>
          <div class="restart-btn">
          <button type="button" class="js-restart-button final">Restart Quiz</button></div>
          </div>`);
        } else if (score < 8 && score >= 4) {
            $('.questionForm').html(`<div class="results feedbackCorrect"><h3>Are you sure you're an Everton fan?</h3>
          <p>Your score is ${score} / 10</p><h4>True fandom requires more knowledge.<br>Feel free to try again!</h4>
          <div class="restart-btn">
          <button type="button" class="js-restart-button final">Restart Quiz</button></div>
          </div>`);
        } else {
            $('.questionForm').html(`<div class="results feedbackCorrect"><h3>You must be a Liverpool fan!</h3>
          <p>Your score is ${score} / 10</p><h4>Go back to Anfield!</h4>
          <div class="restart-btn">
          <button type="button" class="js-restart-button final">Restart Quiz</button></div>
          </div>`);
        }
        handleRestart();
    }

    //handle restart button event
    function handleRestart() {
        $('main').on('click', '.js-restart-button', function(event) {
            console.log('successful quiz restart');
            event.preventDefault();
            location.reload();
        });
    }


    bindEventListeners();
});