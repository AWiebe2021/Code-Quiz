var score = 0;
var questionIndex=0;
var timerEl = document.getElementById('countdown');
var scoreEl = document.getElementById('score');
var timeLeft = 75;
var outOfTime = false;
var timeInterval;
var msgDiv = document.querySelector('#msg');

// setup starter page
scoreEl.textContent  =  " ";
var questionEl = document.getElementById("question");
questionEl.innerText = 'Let us Begin';
var answersEl = document.getElementById("answers");
while (answersEl.hasChildNodes()) {  
  answersEl.removeChild(answersEl.firstChild);
};

var listItemEl = document.createElement("li");
listItemEl.appendChild(document.createTextNode(""));
var button = document.createElement("button");
button.className = "btn";
button.setAttribute('id','startQuiz')
button.innerHTML = ("Start Quiz");
button.onclick = startGame;
listItemEl.appendChild(button);
answersEl.appendChild(listItemEl);

function startGame(){
  // The array of questions for the game.
  questionsArray = new Array();
  questionsArray = [
    'Which type of JavaScript language is ___.',
    'When interpreter encounters an empty statements, what it will do:',
    'Which one of the following also known as Conditional Expression:',
    'The "function" and " var" are known as:',
    'In JavaScript, what is a block of statement?'
  ];
  // The 2D array of answers (as objects) for the game.
  answersArray= new Array();
  answersArray[0] = [
    {a: 'Object-Oriented', c: 'Wrong'},
    {a: 'Object-Based', c: 'Correct'},
    {a: 'Assembly-language', c: 'Wrong'},
    {a: 'High-level', c: 'Wrong'}
  ];
  answersArray[1] = [
    {a: 'Shows a warning', c: 'Wrong'},
    {a: 'Prompts to complete the statement', c: 'Wrong'},
    {a: 'Throws an error', c: 'Wrong'},
    {a: 'Ignores the statements', c: 'Correct'}
  ];
  answersArray[2] = [
    {a: 'Alternative to if-else', c: 'Wrong'},
    {a: 'Switch statement', c: 'Wrong'},
    {a: 'If-then-else statement', c: 'Wrong'},
    {a: 'Immediate if', c: 'Correct'}
  ];
  answersArray[3] = [
    {a: 'Keywords', c: 'Wrong'},
    {a: 'Data types', c: 'Wrong'},
    {a: 'Declaration statements', c: 'Correct'},
    {a: 'Prototypes', c: 'Wrong'}
  ];
  answersArray[4] = [
    {a: 'Conditional block', c: 'Wrong'},
    {a: 'Block that combines a number of statements into a single compound statement', c: 'Correct'},
    {a: 'Both conditional block and a single statement', c: 'Wrong'},
    {a: 'Block that contains a single statement', c: 'Wrong'}
  ];
  // reset conditions
  outOfTime = false;
  timeLeft = 75;
  clearInterval(timeInterval);
  questionIndex = 0;
  score = 0;
  displayMessage('success', ' ');

  // Start Timer
  countdown();
  createQuestion();

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
};

//  Create new list of answer buttons
function createAnswers(answerIndex){
  var answersEl = document.getElementById("answers");
  var listItemEl = document.createElement("li");
  listItemEl.appendChild(document.createTextNode(""));
  var button = document.createElement("button");
  button.className = "btn";
  button.innerHTML = (answersArray[questionIndex][answerIndex].a);
  button.setAttribute("conclusion",(answersArray[questionIndex][answerIndex].c));
  button.onclick = scoreAnswer;
  listItemEl.appendChild(button);
  answersEl.appendChild(listItemEl);
};

// Timer that counts down in seconds
function countdown() {
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
       scoreAnswer();
    };
  }, 1000);
};

//Score the answer, if answered or not
function scoreAnswer(evt){
//didn't answer, ran out of time
  if (outOfTime){
    timerEl.textContent = 'OOT';
    displayMessage('error', (msgDiv.textContent + ', Ran out of time'));
    // alert('You are out of time')
  }else{
    // answered check right or wrong
    conclusion = evt.currentTarget.getAttribute("conclusion");
    if((conclusion === "Correct")){
      score++;
      displayMessage('success', 'Last answer was ' + conclusion);
    }else{
      timeLeft= timeLeft - 15;
      displayMessage('error', 'Last answer was ' + conclusion + ' 15 seconds deducted');
    }
    // alert('You got it ' + conclusion);
  };
//right or wrong or ranout of time, continue or end
  scoreEl.textContent  =  "Your Score: " + score + "/" + (questionIndex + 1);
  if ((questionIndex < questionsArray.length - 1) && !(outOfTime)){
    questionIndex++;
    createQuestion();
  }else{
    endGame();
  }
};     

// save data action
function submitScore(){
  var initials = document.querySelector('#inputId').value;
  var scoreString = score + "/" + (questionIndex + 1);
  let current = new Date();
  let cDate = current.getFullYear() + '-' + (current.getMonth() + 1) + '-' + current.getDate();
  let cTime = current.getHours() + ":" + current.getMinutes() + ":" + current.getSeconds();
  let time = cDate + ' ' + cTime;

  if (initials === '') {
    displayMessage('error', 'initials cannot be blank');
  } else {
    displayMessage('success', 'Registered successfully');

    // Save data
    localStorage.setItem('initials', initials);
    localStorage.setItem('score', scoreString);
    localStorage.setItem('time', time);

    // Render the last registered quiz
    renderLastScore();
  }
}

// Retrieve the data action (whole page)
function renderLastScore() {
  var initials = localStorage.getItem('initials');
  var scoreString = localStorage.getItem('score');
  var time = localStorage.getItem('time');
  var answersEl = document.getElementById("answers");

  timerEl.textContent = " ";
  scoreEl.textContent  =  " ";
  displayMessage('success', 'Last Successfully Registered Quiz');
  var questionEl = document.getElementById("question");
  questionEl.innerText = ' ';
  while (answersEl.hasChildNodes()) {  
    answersEl.removeChild(answersEl.firstChild);
  };

  var listItemEl2 = document.createElement("li");
  listItemEl2.appendChild(document.createTextNode("Last Registered quiz"));
  answersEl.appendChild(listItemEl2);
  
  var listItemEl2 = document.createElement("li");
  listItemEl2.setAttribute('class','data');
  listItemEl2.appendChild(document.createTextNode("User: " + initials));
  answersEl.appendChild(listItemEl2);
  
  var listItemEl2 = document.createElement("li");
  listItemEl2.setAttribute('class','data');
  listItemEl2.appendChild(document.createTextNode("Score: " + scoreString));
  answersEl.appendChild(listItemEl2);
  
  var listItemEl2 = document.createElement("li");
  listItemEl2.setAttribute('class','data');
  listItemEl2.appendChild(document.createTextNode("Time: " + time));
  answersEl.appendChild(listItemEl2);
 
    //add restart button
  var button = document.createElement("button");
  button.className = "btn";
  button.setAttribute('id','startOver');
  button.innerHTML = ('Start Quiz Over');
  button.onclick = startGame;
  answersEl.appendChild(button); 

  clearInterval(timeInterval);
}

//show small info text
function displayMessage(type, message) {
  msgDiv.textContent = message;
  msgDiv.setAttribute('class', type);
}

//end of game (whole page)
function endGame(){
  if (outOfTime){
    timerEl.textContent = "Out of Time";
  }else{
    timerEl.textContent = "";
  };
  scoreEl.textContent  =  "";
  var questionEl = document.getElementById("question");
  questionEl.innerText = "Your Score: " + score + "/" + (questionIndex + 1);
  var answersEl = document.getElementById("answers");
  while (answersEl.hasChildNodes()) {  
    answersEl.removeChild(answersEl.firstChild);
  };
//create label
  var listItemEl2 = document.createElement("li");
  var scoreString = localStorage.getItem('score');
  //creat input box if the score is Higher
  if (scoreString === null){
    scoreString = "0";
  };
  if (score > (scoreString.charAt(0))){
    listItemEl2.appendChild(document.createTextNode("High Score - Enter your Initials"));
    var mi = document.createElement("input");
    mi.setAttribute('type', 'text');
    mi.setAttribute('id','inputId');
    answersEl.appendChild(mi);
    //create button
    var submitButton = document.createElement("button");
    submitButton.className = "btn";
    submitButton.innerHTML = ('Submit');
    submitButton.onclick = submitScore;
    answersEl.appendChild(submitButton);
    displayMessage('success','Highest score')
  }else{
    listItemEl2.appendChild(document.createTextNode("Score is not the highest"));
    displayMessage('error','not the higher score')
     //add restart button
    var button = document.createElement("button");
    button.className = "btn";
    button.setAttribute('id','startOver');
    button.innerHTML = ('Start Quiz Over');
    button.onclick = startGame;
    answersEl.appendChild(button); 
  };
 
//append to the dom
  answersEl.appendChild(listItemEl2);

//stop timer
  clearInterval(timeInterval);
};