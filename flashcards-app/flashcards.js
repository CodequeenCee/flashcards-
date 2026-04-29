// Getting access to all required elements
const flashcards = document.querySelector(".flashcards");
const createBox = document.querySelector(".create-box");
const question = document.querySelector("#question");
const answer = document.querySelector("#answer");
let flashcardsArray = JSON.parse(localStorage.getItem("flashcardsDB")) || [];

// Render any existing cards on load
flashcardsArray.forEach(divMaker);

//Function to display flash cards after the have been saved on the screen
function divMaker(item) {
    if (!item) return;
    const div = document.createElement('div');
    const h2Question = document.createElement('h2');
    const h2Answer = document.createElement('h2');

    div.className = 'flashcard';

    h2Question.setAttribute('style', 'border-top: 1px solid grey; padding: 15px; margin-top: 30px');
    // Use textContent to avoid injecting HTML
    h2Question.textContent = item.question || '';

    h2Answer.setAttribute('style', 'text-align: center; display: none; color: red;');
    h2Answer.textContent = item.answer || '';

    div.appendChild(h2Question);
    div.appendChild(h2Answer);

    // Toggle: show answer and hide question, or vice-versa
    div.addEventListener('click', function (){
        const isAnswerHidden = h2Answer.style.display === 'none' || h2Answer.style.display === '';
        if (isAnswerHidden) {
            h2Answer.style.display = 'block';
            h2Question.style.display = 'none';
        } else {
            h2Answer.style.display = 'none';
            h2Question.style.display = 'block';
        }
    });

    if (flashcards) flashcards.appendChild(div);
}
//Function to delete flashcards
function deleteCard() {
    // Remove only the flashcards key to avoid clearing other storage
    localStorage.removeItem('flashcardsDB');
    flashcardsArray = [];
    if (flashcards) flashcards.innerHTML = "";
}
//Function to create flashcards
function saveCard() {
    let flashcardInfo = {
        question: question.value,
        answer: answer.value
    }
    flashcardsArray.push(flashcardInfo);
    localStorage.setItem("flashcardsDB", JSON.stringify(flashcardsArray));
    // Calling the function to display the new flash card on the screen
    divMaker(flashcardInfo);
    
    // Reset inputs
    question.value = '';
    answer.value = '';
}
//Function to hide the create box
function hideCreateBox() {
    createBox.style.display = "none";
}

//Function to show the create box
function showCreateBox() {
    createBox.style.display = "block";
}

