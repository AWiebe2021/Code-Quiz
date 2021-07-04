// The array of questions for the game.
var exampleQuestions = [
  { q: 'The sky is blue.', a: 't' },
  { q: 'There are 365 days in a year.', a: 't' },
  { q: 'There are 42 ounces in a pound.', a: 'f' },
  { q: 'The Declaration of Independence was created in 1745.', a: 'f' },
  { q: 'Bananas are vegetables.', a: 'f' }
];
questions = new Array();
questions = [
  'Which type of JavaScript language is ___.',
  'Which of the following is the correct output for the following JavaScript code: \
  varx=5,y=1 \
  var obj ={ x:10} \
  with(obj) \
  { \
    alert(y)\
  }',
  'Which one of the following also known as Conditional Expression:',
  'Among the following given JavaScript snipped codes, which is more efficient: \
  Code A \
  for(var number=10;number>=1;number--)  \
  { \
    document.writeln(number);  \
  } \
  Code B \
  var number=10;  \
  while(number>=1)  \
  {  \
    document.writeln(number);  \
    number++;  \
  }',
  'In JavaScript, what is a block of statement?'
];

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
// console.log("Hello world!");
// console.log(answersArray[0][0].c);
// console.table(answersArray);

// // We start the game with a score of 0.
  var score = 0;
  
  // // Loop over every question object
  for (var i = 0; i < questions.length; i++) {
    var aWrapperEl = document.getElementsByClassName("answers-wrapper");
    var questionEl = document.getElementById("question");
      questionEl.innerText = questions[i];
      questionEl.append;
    //clear former answers
    var answersEl = document.getElementById("answers");
    while (answersEl.hasChildNodes()) {  
      answersEl.removeChild(answersEl.firstChild);
    }
    answersArray[i].forEach(createAnswers);
      /// start a timer to answer

  //   // Compare answers
  //   if (
  //     (answer === true && questions[i].a === 't') ||
  //     (answer === false && questions[i].a === 'f')
  //   ) {
  //     // Increase score
  //     score++;
  //     // Alert the user
  //     alert('Correct!');
  //   } else {
  //     alert('Wrong!');
  //   }
  }
  
  function createAnswers(item,i2){
    var answersEl = document.getElementById("answers");
    var listItemEl = document.createElement("li");
    listItemEl.appendChild(document.createTextNode(""));

    var button = document.createElement("button");
    button.className = "answer-button";
    button.innerHTML = (answersArray[i][i2].a);
    listItemEl.appendChild(button);
    listItemEl.setAttribute("conclusion",(answersArray[i][i2].c));
    answersEl.appendChild(listItemEl);

    // listItemEl.textContent = (answersArray[i][i2].a);
    // answersEl.appendChild(listItemEl);
  }

   
  // // Show total at end
  // alert('You got ' + score + '/' + questions.length);


  // var buttonEl = document.querySelector("#save-task");
  // var answersEl = document.querySelector("#answers");
  
  // var createTaskHandler = function() {
  //   var listItemEl = document.createElement("li");
  //   listItemEl.className = "answer-button";
  //   listItemEl.textContent = "This is a new task.";
  //   tasksToDoEl.appendChild(listItemEl);
  // };
  
  // buttonEl.addEventListener("click", createTaskHandler);
    