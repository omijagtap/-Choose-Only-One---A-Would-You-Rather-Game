let questions;
let currentQuestionIndex = 0;
let timeoutId;
let optionClicked = false;

fetch('questions.json')
  .then(response => response.json())
  .then(data => {
    questions = data;
    displayQuestion(currentQuestionIndex);
  })
  .catch(error => {
    console.error('Error loading questions:', error);
  });

function displayQuestion(index) {
  const question = questions[index];
  document.getElementById('questionText').innerText = question.question;
  document.getElementById('op1').children[0].innerText = question.option1.text;
  document.getElementById('op2').children[0].innerText = question.option2.text;

  // Hide the 0% icon for both options
  document.querySelectorAll('.percentage').forEach(element => {
    element.style.display = 'none';
  });

  optionClicked = false; // Reset the optionClicked flag
}

function showNextQuestion() {
  if (optionClicked) {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
      displayQuestion(currentQuestionIndex);
      resetTimer();
    } else {
      alert('No more questions!');
    }
  }
}

function startTimer() {
  timeoutId = setTimeout(() => {
    showNextQuestion();
  }, 5000);
}

function resetTimer() {
  clearTimeout(timeoutId);
  startTimer();
}

function animatePercentage(percentage1, percentage2) {
  let current1 = 0;
  let current2 = 0;

  const step1 = Math.ceil(percentage1 / 20);
  const step2 = Math.ceil(percentage2 / 20);

  const interval = setInterval(() => {
    if (current1 >= percentage1 && current2 >= percentage2) {
      clearInterval(interval);
    } else {
      if (current1 < percentage1) {
        current1 += step1;
        current1 = Math.min(current1, percentage1);
        document.querySelector('#op1 .percentage').innerText = `${current1}%`;
      }
      if (current2 < percentage2) {
        current2 += step2;
        current2 = Math.min(current2, percentage2);
        document.querySelector('#op2 .percentage').innerText = `${current2}%`;
      }
    }
  }, 30);
}




document.getElementById('op1').addEventListener('click', () => {
  if (!optionClicked) {
    optionClicked = true;
    document.getElementById('op1').classList.add('clicked');
    document.getElementById('op2').classList.add('clicked');
    resetTimer();
    animatePercentage(questions[currentQuestionIndex].option1.percentage, questions[currentQuestionIndex].option2.percentage);
    // Show the percentage for both options
    document.querySelectorAll('.percentage').forEach(element => {
      element.style.display = 'inline';
    });
    setTimeout(() => {
  
      document.getElementById('op1').classList.remove('clicked');
      document.getElementById('op2').classList.remove('clicked');
      optionClicked = false;
      showNextQuestion();
    }, 5000); // Wait for 5 seconds before resetting
  }
});

document.getElementById('op2').addEventListener('click', () => {
  if (!optionClicked) {
    optionClicked = true;
    document.getElementById('op1').classList.add('clicked');
    document.getElementById('op2').classList.add('clicked');
    resetTimer();
    animatePercentage(questions[currentQuestionIndex].option2.percentage, questions[currentQuestionIndex].option1.percentage);
    // Show the percentage for both options
    document.querySelectorAll('.percentage').forEach(element => {
      element.style.display = 'inline';
    });
    setTimeout(() => {


      document.getElementById('op1').classList.remove('clicked');
      document.getElementById('op2').classList.remove('clicked');
      optionClicked = false;
      showNextQuestion();
    }, 5000); // Wait for 5 seconds before resetting
  }
});




// Start the game
startTimer();
