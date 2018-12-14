'use strict'

const QUESTIONS = [
    {question: 'Which of the following were one of Micheal Scott\'s love interests?',
    answer: 'deborah',
    number: 1},
    {question: 'Which character frames an employee at the paper mill?',
    answer: 'creed',
    number: 2},
    {question: 'Who plays Golden Face in Threat Level Midnight?',
    answer: 'jim',
    number: 3},
    {question: 'Who is the only character who has a mustache throughout the duration of the show?',
    answer: 'stanley',
    number: 4},
    {question: 'Which character is known to have slept in their car after a messy divorce?',
    answer: 'floby',
    number: 5},
    {question: 'Which character has Oscar dated?',
    answer: 'senator',
    number: 6},
    {question: 'Who had an affair while married to Angela?',
    answer: 'senator',
    number: 7},
    {question: 'Who wears sandals on casual Friday?',
    answer: 'oscar',
    number: 8},
    {question: 'Who\'s car did Micheal Scott hit with a watermellon?',
    answer: 'stanley',
    number: 9},
    {question: 'Who\'s grave does Micheal Scott and Dwight Schrute dance on?',
    answer: 'deborah',
    number: 10}
];

const OPTIONS = [
    {src: '.images/stanley.jpg',
    id: 'stanley'},
    {src: '.images/floby.jpg',
    id: 'floby'},
    {src: '.images/creed.jpg',
    id: 'creed'},
    {src: '.images/jim.jpg',
    id: 'jim'},
    {src: '.images/senator.jpg',
    id: 'senator'},
    {src: '.images/chair-model.jpg',
    id: 'deborah'},
    {src: '.images/angela.jpg',
    id: 'angela'},
    {src: '.images/kevin.jpg',
    id: 'kevin'},
    {src: '.images/oscar.jpg',
    id: 'oscar'}
];

function renderQuizPage(currentQuestion, correct){
    //This should render the question page to the DOM
    console.log('renderQuizPage called')

    const quizPage = createQuizPage(currentQuestion, correct);
    $('body').html(quizPage);

    handleOptionChoose(currentQuestion, correct);
    //The createQuizPage function should be called.
}

function createQuizPage(currentQuestion, correct){
    //This function should create and return a string to be rendered to the DOM
    console.log('createQuizPage');

    const quizPageHtml = createHeader(currentQuestion, correct) + createQuestion(currentQuestion);
    return quizPageHtml;

    //The createHeader and createQuestions functions should be called to create proper HTML to be rendered
}

function createHeader (currentQuestion, correct){
    //This function should create and return the header to be rendered to the page using the arguments to show state
    console.log('createHeader called');

    const headerHtml = `<header class='quiz-header'>
    <h1>The Office Quiz</h1>
    <div class="info js-info">
        <h2 class='questions-answered js-questions-answered'>Answered: ${currentQuestion}/10</h2>
        <h2 class='questions-correct js-questions-correct'>Correct: ${correct}</h2>
    </div>
</header>`;
    return headerHtml;
}

function createQuestion (currentQuestion){
    //This function should create and return the question html to be rendered to the Dom
    const question = QUESTIONS[currentQuestion].question;
    let optionsUsed = [];
    let options = [];

    console.log('createQuestion called');

    options.push(createOption(currentQuestion, optionsUsed));
    options.push(createOption(currentQuestion, optionsUsed));
    options.push(createOption(currentQuestion, optionsUsed));
    options.push(createOption(currentQuestion, optionsUsed));

    shuffleOptions(options);

    const questionHtml = 
        `<div class='content'>
            <main class='js-main-quiz'>
                <form class='quiz-form js-quiz-form'>
                    <div class='quiz-block'>
                        <h3 class='quiz-question'>${question}</h3>
                        <div class='radio-group js-radio-group'>
                            ${options[0]}
                            ${options[1]}
                            ${options[2]}
                            ${options[3]}
                        </div>
                    </div>
                </form>
            </main>
        </div>`;
    return questionHtml
    //The createOption function should be called 4 times. Once for each quiz answer option.
    //Ideally, logic to randomize quiz options would be possible.
}

function shuffleOptions (options) {
    for (let i = 0; i < 100; i++) {
        let random = Math.floor(Math.random() * 4);
        let placeHolder = options[0];
        options[0] = options[random];
        options[random] = placeHolder;
    }

}

function createOption (currentQuestion, optionsUsed) {
    //This function should create and return an option (image) to be rendered to the DOM
    let quizOptionHtml = '';
    let option = '';

    console.log('createOption called');

    if (optionsUsed.length == 0) {
        optionsUsed.push(QUESTIONS[currentQuestion].answer);
        quizOptionHtml = (
            `<label class='quiz-option'>
                <input type="image" src='./images/${optionsUsed[0]}.jpg' alt='${optionsUsed[0]}' name='${optionsUsed[0]}' id='answer${optionsUsed.length}'>
            </label>`);
    }
    else {
        do {
            option = (OPTIONS[Math.floor(Math.random() * 9)].id);
        } while(checkOptionUsed(option, optionsUsed));
        optionsUsed.push(option);
        quizOptionHtml = (
            `<label class='quiz-option'>
                <input type="image" src='./images/${option}.jpg' alt='${option}' name='${option}' id='answer${optionsUsed.length}'>
            </label>`);
     }
    return (quizOptionHtml);
    //This function will use the currentQuestion, and optionsUsed variables to create a new option randomly
}

function checkOptionUsed (id, optionsUsed) {
    //This function will check if an option is currently a part of the set optionsUsed based on the passed id
    //Returns true if the option is already in use.
    let isUsed = false;

    console.log(optionsUsed);

    for (let i = 0; i < optionsUsed.length; i++) {
        if (id == optionsUsed[i]) {
            isUsed = true;
            console.log(optionsUsed[i]);
        }
    }

    return isUsed;
}

function renderSuccessPage(currentQuestion, correct){
    $('body').html(
        `<div class='gif-container'><img src='http://www.thedailyaztec.com/wp-content/uploads/2015/01/M-Scott14.gif' alt='success-gif'></div>
        <div class='start-layout'>
            <button class='start-button js-start-button'>Next</button>
        </div>`);
    handleStart(currentQuestion, correct);
}

function renderFailurePage(currentQuestion, correct){
    $('body').html(
        `<div class='gif-container'><img src='https://media.giphy.com/media/d10dMmzqCYqQ0/giphy.gif' alt='failure-gif'></div>
        <div class='start-layout'>
            <button class='start-button js-start-button'>Next</button>
        </div>`);
    handleStart(currentQuestion, correct);
}

function renderCompletePage(currentQuestion, correct){
    //This function should render the quiz-complete page
    $('body').html(
        `${createHeader(currentQuestion, correct)}<div class='gif-container'><img src='https://media.giphy.com/media/vDjcGXLiFKLle/giphy.gif' alt='complete-gif'></div>
        <div class='start-layout'>
            <button class='start-button js-start-button'>Again?</button>
        </div>`);
    handleStart(0, 0);
}

function renderStartPage(currentQuestion, correct) {
    $('body').html(`
        <main class='main-start'>
            <div class='start-layout'>
                <button class='start-button js-start-button'>Start</button>
            </div>
        </main>`);
    handleStart(currentQuestion, correct);
}

function handleOptionChoose(currentQuestion, correct) {
    $('.js-quiz-form').on('click', 'input[type=image]', function(event) {
        event.preventDefault();
        
        if ($(this).attr('name') == QUESTIONS[currentQuestion].answer){
            correct++;
            currentQuestion++;
            renderSuccessPage(currentQuestion, correct);
        }
        else {
            currentQuestion++;
            renderFailurePage(currentQuestion, correct);
        }
        if(currentQuestion == 10) {
            renderCompletePage(currentQuestion, correct);
        }
    });
}

function handleStart(currentQuestion, correct){
    $('.js-start-button').on('click', (event) => {
        event.preventDefault();
        renderQuizPage(currentQuestion, correct);
    });
}

$(renderStartPage(0, 0));