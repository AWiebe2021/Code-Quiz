// We start the game with a score of 0.
var score = 0;
var questionIndex=0;
// var questionState = 'unanswered';
var timerEl = document.getElementById('countdown');
var scoreEl = document.getElementById('score');
var timeLeft = 30;
var outOfTime = false;
var timeInterval;

// timerEl.textContent = "";
// scoreEl.textContent  =  "";
var questionEl = document.getElementById("question");
questionEl.innerText = 'Let us Begin';
var answersEl = document.getElementById("answers");
while (answersEl.hasChildNodes()) {  
  answersEl.removeChild(answersEl.firstChild);
};

var listItemEl = document.createElement("li");
listItemEl.appendChild(document.createTextNode(""));
var button = document.createElement("button");
button.className = "answer-button";
button.innerHTML = ("Start Quiz");
button.onclick = startGame;
listItemEl.appendChild(button);
answersEl.appendChild(listItemEl);

function startGame(){
  // The array of questions for the game.
  questionsArray = new Array();
  questionsArray = [
    'Which type of JavaScript language is ___.',
    'Which of the following is the correct output for the following JavaScript code: \n var x=5,y=1 \n var obj ={ x:10} \n with(obj) \n { \n  alert(y) \n }',
    'Which one of the following also known as Conditional Expression:',
    'Among the following given JavaScript snipped codes, which is more efficient: \n Code A \n for(var number=10;number>=1;number--) \n  { \n    document.writeln(number);  \n  } \n  Code B \n  var number=10;  \n  while(number>=1)  \n  {  \n    document.writeln(number);  \n    number++;  \n  }',
    'In JavaScript, what is a block of statement?'
  ];
  // The array of answers for the game.
  answersArray= new Array();
  answersArray[0] = [
    {a: 'Object-Oriented', c: 'Wrong'},
    {a: 'Object-Based', c: 'Correct'},
    {a: 'Assembly-language', c: 'Wrong'},
    {a: 'High-level', c: 'Wrong'}
  ];
  answersArray[1] = [
    {a: '1', c: 'Correct'},
    {a: 'Error', c: 'Wrong'},
    {a: '10', c: 'Wrong'},
    {a: '5', c: 'Wrong'}
  ];
  answersArray[2] = [
    {a: 'Alternative to if-else', c: 'Wrong'},
    {a: 'Switch statement', c: 'Wrong'},
    {a: 'If-then-else statement', c: 'Wrong'},
    {a: 'immediate if', c: 'Correct'}
  ];
  answersArray[3] = [
    {a: 'Code 1', c: 'Correct'},
    {a: 'Code 2', c: 'Wrong'},
    {a: 'Both Code 1 and Code 2', c: 'Wrong'},
    {a: 'Cannot Compare', c: 'Wrong'}
  ];
  answersArray[4] = [
    {a: 'Conditional block', c: 'Wrong'},
    {a: 'block that combines a number of statements into a single compound statement', c: 'Correct'},
    {a: 'both conditional block and a single statement', c: 'Wrong'},
    {a: 'block that contains a single statement', c: 'Wrong'}
  ];
  createQuestion();
  // // reset conditions
  // questionState = 'unanswered';
  // outOfTime = false;
  // timeLeft = 30;
  // clearInterval(timeInterval);
  // // Start Timer
  // countdown();
};

function createQuestion(){
  var questionEl = document.getElementById("question");
  questionEl.innerText = questionsArray[questionIndex];
  // clear former answers
  var answersEl = document.getElementById("answers");
  while (answersEl.hasChildNodes()) {  
    answersEl.removeChild(answersEl.firstChild);
  };
  //  Create new answer buttons
  for (var answerIndex = 0; answerIndex < answersArray[questionIndex].length; answerIndex++) {
    createAnswers(answerIndex);
  };
  // reset conditions
  // questionState = 'unanswered';
  outOfTime = false;
  timeLeft = 30;
  clearInterval(timeInterval);
  
  // Start Timer
  countdown();
};


function createAnswers(answerIndex){
  var answersEl = document.getElementById("answers");
  var listItemEl = document.createElement("li");
  listItemEl.appendChild(document.createTextNode(""));
  var button = document.createElement("button");
  button.className = "answer-button";
  button.innerHTML = (answersArray[questionIndex][answerIndex].a);
  button.setAttribute("conclusion",(answersArray[questionIndex][answerIndex].c));
  button.onclick = scoreAnswer;
  listItemEl.appendChild(button);
  answersEl.appendChild(listItemEl);
};

// Timer that counts down from 30
function countdown() {
  outOfTime = false;    
  timeInterval = setInterval(function() {
    if (timeLeft > 1) {
      timerEl.textContent = timeLeft + ' seconds remaining';
      timeLeft--;
    } else if (timeLeft === 1) {
      timerEl.textContent = timeLeft + ' second remaining';
      timeLeft--;
    } else {
       timerEl.textContent = timeLeft;
       clearInterval(timeInterval);
       outOfTime = true;
      //  questionState = 'answered';
       scoreAnswer();
    };
  }, 1000);
};

function scoreAnswer(evt){
  if (outOfTime){
    timerEl.textContent = 'OOT';
    // alert('You are out of time')
  }else{
    // if (questionState === 'unanswered'){
      conclusion = evt.currentTarget.getAttribute("conclusion")
      if((conclusion === "Correct")){
        score++;
      };
      // alert('You got it ' + conclusion);
      // questionState = 'answered';
    // }else{
    //   // alert('This Question has been answered');
    // };
  };
  scoreEl.textContent  =  "Your Score: " + score + "/" + (questionIndex);
  if (questionIndex < questionsArray.length){
    createQuestion();
    questionIndex++;
  }else{
    endGame();
  }
};     

function endGame(){
  timerEl.textContent = "";
  scoreEl.textContent  =  "";
  var questionEl = document.getElementById("question");
  questionEl.innerText = 'All Done';
  var answersEl = document.getElementById("answers");
  while (answersEl.hasChildNodes()) {  
    answersEl.removeChild(answersEl.firstChild);
  };
  var listItemEl = document.createElement("li");
  listItemEl.appendChild(document.createTextNode("Your Score: " + score + "/" + (questionIndex)));
  answersEl.appendChild(listItemEl);
  clearInterval(timeInterval);
};