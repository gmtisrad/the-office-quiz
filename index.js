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
    {question: 'Who is most likely to donate to aids for afghanistananis?',
    answer: 'jim',
    number: 6},
    {question: 'Who had an affair while married to Angela?',
    answer: 'senator',
    number: 7},
    {question: 'Who knows random facts about the sun?',
    answer: 'andy',
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
    const question = QUESTIONS[currentQuestion];
    let optionsUsed = []

    console.log('createQuestion called');

    const questionHtml = 
        `<div class='content'>
            <main class='js-main-quiz'>
                <form class='quiz-form js-quiz-form'>
                    <div class='quiz-block'>
                        <h3 class='quiz-question'>${question}</h3>
                       <div class='radio-group js-radio-group'>
                            ${createOption(currentQuestion, optionsUsed)}
                            ${createOption(currentQuestion, optionsUsed)}
                            ${createOption(currentQuestion, optionsUsed)}
                            ${createOption(currentQuestion, optionsUsed)}
                        </div>
                    </div>
                </form>
            </main>
        </div>`;
    return questionHtml
    //The createOption function should be called 4 times. Once for each quiz answer option.
    //Ideally, logic to randomize quiz options would be possible.
}

function createOption (currentQuestion, optionsUsed) {
    //This function should create and return an option (image) to be rendered to the DOM
    let quizOptionHtml = '';
    let option = '';

    console.log('createOption called');

    if (optionsUsed.length == 0) {
        alert (currentQuestion);
        optionsUsed.push(QUESTIONS[currentQuestion].answer);
        quizOptionHtml = (
            `<div class='quiz-option'>
                <input type="image" src='./images/${optionsUsed[0]}.jpg' alt='${optionsUsed[0]}' name='${optionsUsed[0]}' id='answer${optionsUsed.length}'>
            </div>`);
    }
    else {
        do {
            option = (OPTIONS[Math.floor(Math.random() * 9)].id);
        } while(checkOptionUsed(option, optionsUsed));
        optionsUsed.push(option);
        quizOptionHtml = (
            `<div class='quiz-option'>
                <input type="image" src='./images/${optionsUsed[optionsUsed.length]}.jpg' alt='${optionsUsed[optionsUsed.length]}' name='${optionsUsed[optionsUsed.length]}' id='answer${optionsUsed.length}'>
            </div>`);
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

function renderSuccessPage(){
    //This function should render the success page to the DOM
}

function renderFailurePage(){
    //This function should render the failure page to the DOM
}

function renderCompletePage(){
    //This function should render the quiz-complete page

    $('body').html(
        `<div class='gif-container'><img src='https://media.giphy.com/media/vDjcGXLiFKLle/giphy.gif' alt='complete-gif'></div>
        <div class='start-layout'>
            <button class='start-button'>Start</button>
        </div>`);
}

$(renderQuizPage(0, 0));