let score = 0;
let num1, num2, operator, correctAnswer;
let timeLeft = 10;
let timerInterval;

function generateQuestion() {
  clearInterval(timerInterval);
  timeLeft = 10;
  updateTimer();
  timerInterval = setInterval(updateTimer, 1000);

  const operators = ['+', '-', '*', '/'];
  num1 = Math.floor(Math.random() * 10) + 1;
  num2 = Math.floor(Math.random() * 10) + 1;
  operator = operators[Math.floor(Math.random() * operators.length)];

  if (operator === '/') {
    correctAnswer = num1;
    num1 = num1 * num2;
  } else {
    switch (operator) {
      case '+':
        correctAnswer = num1 + num2;
        break;
      case '-':
        correctAnswer = num1 - num2;
        break;
      case '*':
        correctAnswer = num1 * num2;
        break;
    }
  }

  document.getElementById("question").textContent = `¿Cuánto es ${num1} ${operator} ${num2}?`;
  document.getElementById("answer").value = "";
  document.getElementById("feedback").textContent = "";
}

function updateTimer() {
  const timerDisplay = document.getElementById("timer");
  timerDisplay.textContent = `Tiempo: ${timeLeft}`;
  if (timeLeft === 0) {
    clearInterval(timerInterval);
    document.getElementById("feedback").textContent = `Tiempo agotado. La respuesta era ${correctAnswer}`;
    document.getElementById("feedback").style.color = "red";
    setTimeout(generateQuestion, 1500);
  }
  timeLeft--;
}

function checkAnswer() {
  clearInterval(timerInterval);
  const userAnswer = parseFloat(document.getElementById("answer").value);
  const feedback = document.getElementById("feedback");

  if (userAnswer === correctAnswer) {
    feedback.textContent = "¡Correcto! 🎉";
    feedback.style.color = "green";
    score++;
  } else {
    feedback.textContent = `Incorrecto. La respuesta era ${correctAnswer}`;
    feedback.style.color = "red";
  }
  document.getElementById("score").textContent = `Puntos: ${score}`;
  setTimeout(generateQuestion, 1500);
}

generateQuestion();
