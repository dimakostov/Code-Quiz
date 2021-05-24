//questions array
var questions = [
        {
            question: "Commonly used data types do not include:", 
            a: "A. strings",
            b: "B. booleans",
            c: "C. alerts",
            d: "D. numbers",
            answer: "B. booleans"
        },
        {
            question: "The condition If/Else statment is enclosed with _________.", 
            a: "A. Quotes",
            b: "B. Curly Brackets",
            c: "C. Parenthesis",
            d: "D. Square Brackets",
            answer: "C. Parenthesis"
        },
        {
            question: "Arrays in Javascript can be used to store _________.",
            a: "A. Numbers and Strings",
            b: "B. Other Arrays",
            c: "C. Booleans",
            d: "D. All The Above",
            answer: "D. All The Above"
        },
        {
            question: "String values must be enclosed within ______ when being assinged to variables.",
            a: "A. Commas",
            b: "B. Curly Brackets",
            c: "C. Quotes",
            d: "D. Parentheis",
            answer: "B. Curly Brackets"
        },
        {
            question: "A very useful tool when during development and debugging for printing content to the debugger is", 
            a: "A. Javascript",
            b: "B. Terminal/Bash",
            c: "C. for loops",
            d: "D. console.log",
            answer: "C. for loops"
        }
    ];
var time = 99, score = 0;
var justLoaded = true;
var currScore = 0;
var questionEl = document.querySelector("#question"), bodyEl = document.querySelector(".body"),
timer = document.querySelector("#timer"), skipBtn = document.querySelector("#skip-button");

var timeInterval = setInterval(function() {
    timer.textContent = time;
    time--;
}, 1000);

var currEntry = 0;

function displayQuestion(event){
    if (currEntry === 4)
    {
        var initials = prompt("Please enter your Initials: ");
        score = score + time/2;
        var scoreBoard = "";

        var scoresArray = [], initialsArray = [];
        if (localStorage.getItem("scores") === null || localStorage.getItem("initials") === null ||
        localStorage.getItem("scores") === "" || localStorage.getItem("initials") === "")
        {
            localStorage.setItem("scores", [score]); localStorage.setItem("initials",[initials]);
        }
        scoresArray = JSON.parse(localStorage.getItem("scores")); initialsArray = JSON.parse(localStorage.getItem("initials"));
        scoresArray.push(score); initialsArray.push(initials);
        localStorage.setItem("scores", JSON.stringify(scoresArray)); localStorage.setItem("initials",JSON.stringify[initialsArray]);

        for (var i = 0; i < scoresArray.length; i++)
        {
            scoreBoard += initialsArray[i] + ": " + scoresArray[i] + "\n";
            alert(scoreBoard);
        }
    }
    if (!justLoaded)
    {
        if (!justSkipped)
        {
            if (event.target.getAttribute("class")!=="answer")
            {
                return;
            }
        }
    }
    if (!justLoaded && !justSkipped)
    {
        if (event.target.textContent === questions[currEntry].answer)
        {
            score += 10;
            event.target.backgroundColor = "lightgreen";
            var secs = 0;
            alert("correct!");
        }
    }
    if(!justLoaded)
    {
        currEntry++;
    }
    bodyEl.innerHTML = "";
    if (questions[currEntry]!==undefined)
    {
        var questionEntry = questions[currEntry];
        questionEl.textContent = questionEntry.question;
        
        function addAnswerEntry(custom_answer)
        {
            var div, p;
            div = document.createElement('div');
            p = document.createElement('p');
            p.textContent = custom_answer;
            p.setAttribute("class","answer")
            div.appendChild(p);
            div.setAttribute("class","answer");
            bodyEl.appendChild(div);
        }

        addAnswerEntry(questionEntry.a);
        addAnswerEntry(questionEntry.b);
        
        if (questionEntry.hasOwnProperty('c'))
        {
            addAnswerEntry(questionEntry.c);
        }
        if (questionEntry.hasOwnProperty('d'))
        {
            addAnswerEntry(questionEntry.d)
        }
        // if(!justLoaded)
        // {
        //     currEntry++;
        // }
        if (questions[currEntry+1] === undefined)
        {
            skipBtn.textContent = "Last Question";
            skipBtn.style.backgroundColor = "darkgray";
        }
        //sidenote: later, store divs in array, and increase padding?/fontsize? to spread questions evenly 
    }
if (justLoaded)
{
    justLoaded = false;
}
justSkipped = false;
}




var justSkipped = false;
function skipQuestion(){
justSkipped = true;
//currEntry - 1
if (questions[currEntry-1]!==undefined)
{
    questions.push(questions[currEntry-1]);
    score-=5;
    time-=5;
    displayQuestion();
}
// else
// {
//     skipBtn.textContent = "Last Question";
//     skipBtn.setAttribute("background-color","dark-gray");
// }
}

document.onload = displayQuestion();
bodyEl.addEventListener("click", displayQuestion);
skipBtn.addEventListener("click",skipQuestion);