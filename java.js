const input = document.getElementById('password');
const output = document.getElementById('output');
const button = document.getElementById('submitBtn');
const dragonImage = document.querySelector('.dragon-icon');
const questionContainer = document.createElement('div'); // New container for the question

button.addEventListener('click', function () {
  const value = input.value.trim();

  const hasUppercase = /[A-Z]/.test(value);
  const hasNumber = /\d/.test(value);
  const hasSymbol = /[^a-zA-Z0-9]/.test(value);
  const isLongEnough = value.length >= 10;

  // Reset default cursor and hide dragon unless fully valid
  document.body.style.cursor = 'default';
  dragonImage.style.display = 'none';

  if (value === '') {
    output.innerHTML = 'Please enter a password!';
    input.classList.add('invalid');
  } else if (!isLongEnough) {
    output.innerHTML = 'Use at least 10 characters long!';
    input.classList.add('invalid');
  } else if (!hasUppercase) {
    output.innerHTML = 'Use at least one UPPERCASE letter!';
    input.classList.add('invalid');
  } else if (!hasNumber) {
    output.innerHTML = 'Now add at least one NUMBER!';
    input.classList.add('invalid');
  } else if (!hasSymbol) {
    output.innerHTML = 'Almost there! Add at least one SYMBOL!';
    input.classList.add('invalid');
  } else {
    // Create the question with options
    output.innerHTML = '';
    questionContainer.innerHTML = `
      <p>Who killed ძერა?</p>
      <button class="answer-btn" data-answer="1">1. მე</button>
      <button class="answer-btn" data-answer="2">2. შოთა</button>
      <button class="answer-btn" data-answer="3">3. ზეგ</button>
    `;
    output.appendChild(questionContainer);
    document.body.style.cursor = 'default'; // Reset cursor

    // Add event listeners for the answer buttons
    const answerButtons = document.querySelectorAll('.answer-btn');
    answerButtons.forEach(button => {
      button.addEventListener('click', (event) => {
        const selectedAnswer = event.target.dataset.answer;

        if (selectedAnswer === '2') { // Correct answer is "2. შოთა"
          // Show the "kill the dragon" message and the dragon image
          output.innerHTML = 'Please kill the dragon ';
          dragonImage.src = './assets/dragon.png';
          dragonImage.style.display = 'inline';
          output.appendChild(dragonImage);
          document.body.style.cursor = 'url("./assets/cursor.cur"), auto';
        } else {
          output.innerHTML = 'Incorrect answer, try again!';
          questionContainer.innerHTML = ''; // Hide the options
        }
      });
    });
  }
});

// Enter key support
input.addEventListener('keydown', function (event) {
  if (event.key === 'Enter') {
    button.click();
  }
});

// Kill the dragon on click
dragonImage.addEventListener('click', () => {
  dragonImage.src = './assets/dragon-dead.png';

  // Delay to let the image switch before redirect
  setTimeout(() => {
    window.location.href = 'success.html'; // Redirect to success page
  }, 1000); // 1 second delay for effect
});
