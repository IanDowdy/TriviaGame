let questionList = [

    {
        questionNumber: '1',
        question: 'What level does Charmeleon evolve into Charizard?',
        correct: '36',
        answers: ['30', '32', '36', '40']
    },


    {
        questionNumber: '2',
        question: 'What is the greatest cereal ever to exist?',
        correct: 'Fruity Pebbles',
        answers: ['Fruity Pebbles', 'Frosted Flakes', 'Fruit Loops', 'Lucky Charms']
    },

    {
        questionNumber: '3',
        question: 'Dr. Pepper is the greatest soda on earth.',
        correct: 'duh',
        answers: ['Yes', 'duh', 'Maybe', 'No']
    }
];


//a place to dump used questions if i can figure out how to do that...
let usedQuestions = [];


//variable used to determine which question will be displayed.
let random;
let answerValue;
let gameStarted = false;

//a variable for the timer function.
let intervalId;

let correctAnswer = 0;
let wrongAnswer = 0;
let ranOutOfTime = 0;



//Timer object function/s??.
let timer = {

    //Variable holding the count.
    time: 10,


    //10 second timer activated when the player clicks start.
    run: function () {
        clearInterval(intervalId);
        intervalId = setInterval(timer.decrement, 1000)
        gameStarted = true;
    },

    //second timer, set at 3 seconds with a second timer function.
    run2: function () {
        timer.time = 3
        intervalId = setInterval(timer.decrement2, 1000);
    },


    //The first timer which is used as each questions timer.
    decrement: function () {
        timer.time--;
        //Replaces each number every iteration.
        $("#timer").html("<h2>" + timer.time + "</h2>");

        //if the player runs out of time, stop the clock, inform the player time is up, remove the used question from the array,
        //reset the timer to 3 seconds and run the second clock funtion.
        if (timer.time === 0) {
            timer.stop();
             $('.lead').text('Come on bro just click something')
            console.log("Time is up homie!");
            ranOutOfTime++;
            
           
            timer.run2();

        }


    },

    //When the timer reaches 0, stop the clock, take the selection question and push it to the usedQuestion variable,
    //then remove it from the questionList. run a second if statement that activates if there are no more questions within questionList,
    //endGame function is then invoked, otherwise run the displayQuestions function.
    decrement2: function () {
        timer.time--;

        if (timer.time === 0) {
            timer.stop()
           
            usedQuestions.push(questionList[random]);
            questionList.splice([random], 1);
            
            console.log('The usedQuestions array has ' + usedQuestions.length + ' element(s) in it.');
            if (questionList.length === 0) {
                console.log('Game has ended');
                endGame();
                return;
            }
            displayQuestions();


        }


    },

    stop: function () {
        clearInterval(intervalId);
        gameStarted = false;
    }


}

//starts the game and hides the start button.
$('#start').on('click', startGame);
function startGame() {
    gameStarted = true;
    console.log('ayo');

    $('#start').addClass('invisible');
    displayQuestions();


}


//Empties the answer box before selecting another question.
//Displays question and answers, resets the timer to 10 seconds.
//gives boolean values to each answerChoice by comparing two values within the question array
//starts the timer.
function displayQuestions() {
    $('#answerBlock').empty();
    $('#comment').empty();
    random = Math.floor(Math.random() * questionList.length)
    $('.lead').text(questionList[random].question);
    timer.time = 10;

    for (i = 0; i < questionList[random].answers.length; i++) {
        let b = $('<button>');

        if (questionList[random].answers[i] === questionList[random].correct) {
            b.attr('value', true)
        }
        else {
            b.attr('value', false)
        }
        b.addClass('btn btn-block btn-lg btn-answer');
        b.attr('id', questionList[random].answers[i])
        b.text(questionList[random].answers[i]);


        $('#answerBlock').append(b)
        timer.run();
    }
}


//Runs the check guessfunction when a button on the answerBlock is clicked.
$('#answerBlock').on('click', '.btn-answer', checkGuess);


//using the gameStart if statement helps stop click spamming.
//stops the timer, takes a variable already established and sets it's value to the property of the answer selected. either true or false.
//only the correct answer has the true value.
//true displays a message, tallies the correctAnswer variable, hightlights the correct answer and then activates the second timer.
function checkGuess() {

    if(gameStarted === true){
        timer.stop();
       
        answerValue = $(this).attr('value');
        console.log(answerValue);

        
        if (answerValue === 'true') {
            console.log('boom');
            $('.lead').text("Well you're a smart one aren't you?")
            correctAnswer++; 
            $(this).addClass('right');
            timer.run2();
            
            
        }
        if (answerValue === 'false') {

            wrongAnswer++;
            $('.lead').text("Well you're kinda dumb ain't yah?")
            $(this).addClass('wrong');
            timer.run2();
            
           
        }

    }
  
}


//resets everything.
function endGame() {
    $('#comment').empty();
    $('#answerBlock').empty();
    $('.lead').empty();
    $('#timer').empty();
    console.log('fully ended');
    questionList.push.apply(questionList, usedQuestions)
    usedQuestions = [];
    $('#answerBlock').html(
        '<h4> You answered ' + correctAnswer + ' question(s) correctly,</h4>' +
        '<h4> You answered ' + wrongAnswer + ' question(s) incorrectly,</h4>' +
        '<h4> You for whatever reason could not figure out how to click ' + ranOutOfTime + ' question(s).</h4>' +
        '<h4> Press Start to play again!</h4>'
        



    )
    
    $('#start').removeClass('invisible');


}