var answer;
var correct = 0;
var incorrect = 0;
var total = 0;

var correctMessages = ["رائع جدًا! استمري هكذا!", "أنتِ نجمة!", "إجابتكِ ممتازة!", "مذهل! أنتِ مبدعة!"];
var incorrectMessages = ["حاولي مجددًا، أنتِ قادرة على ذلك!", "خطأ بسيط، يمكنكِ تحسينه!", "لا تقلقي، خذي نفسًا وحاولي مرة أخرى!", "قليل من التركيز وستنجحين!"];

function newQuestion() {
    // End the quiz if 10 questions have been answered
    if (total === 10) {
        calculateScore();
        return;
    }

    // Generate two random numbers between 2 and 12 (inclusive)
    var num1 = Math.floor(Math.random() * 11) + 2; 
    var num2 = Math.floor(Math.random() * 11) + 2; 
    answer = num1 * num2;

    // Update the question and reset inputs/feedback
    document.getElementById("question").textContent = "ما هو حاصل ضرب " + num1 + " في " + num2 + "؟";
    document.getElementById("answer").value = ""; 
    document.getElementById("feedback").textContent = ""; 
    document.getElementById("feedback").className = ""; 
    document.getElementById("celebration-img").style.display = "none"; 
}

function checkAnswer() {
    var userAnswer = parseInt(document.getElementById("answer").value);

    // Validate the user's input
    if (isNaN(userAnswer)) {
        document.getElementById("feedback").textContent = "الرجاء إدخال رقم صحيح.";
        document.getElementById("feedback").className = "incorrect";
        return;
    }

    total++; // Increment total attempts

    if (userAnswer === answer) {
        correct++; // Increment correct answers

        // Display a random correct feedback message
        var feedback = correctMessages[Math.floor(Math.random() * correctMessages.length)];
        document.getElementById("feedback").textContent = feedback;
        document.getElementById("feedback").className = "correct";
        document.getElementById("celebration-img").style.display = "block";

        // Move to the next question after 2 seconds, if not the last question
        if (total < 10) {
            setTimeout(newQuestion, 2000);
        }
    } else {
        incorrect++; // Increment incorrect answers

        // Display a random incorrect feedback message
        var feedback = incorrectMessages[Math.floor(Math.random() * incorrectMessages.length)];
        document.getElementById("feedback").textContent = feedback;
        document.getElementById("feedback").className = "incorrect";
    }

    // Show final score if all 10 questions are answered
    if (total === 10) {
        calculateScore();
    }
}

function calculateScore() {
    var percentage = Math.round((correct / total) * 100); // Calculate score as a percentage

    // Update the score message based on performance
    if (percentage < 75) {
        document.getElementById("score").textContent =
            "نتيجتكِ: " + percentage + "%. معلمتك استاذة نجوى حزينة، تتمنى لك مراجعة جدول الضرب 🥺!";
    } else {
        document.getElementById("score").textContent =
            "نتيجتكِ: " + percentage + "%. معلمتك استاذة نجوى فخورة بكِ 👍🏻 أنتِ متفوقة!!";
    }

    document.getElementById("celebration-img").style.display = "none"; // Hide celebration image
    setTimeout(resetQuiz, 5000); // Reset the quiz after 5 seconds
}

function resetQuiz() {
    // Reset quiz variables
    correct = 0;
    incorrect = 0;
    total = 0;

    // Clear UI elements
    document.getElementById("feedback").textContent = "";
    document.getElementById("feedback").className = "";
    document.getElementById("score").textContent = "";
    document.getElementById("answer").value = "";
    document.getElementById("celebration-img").style.display = "none";

    // Start a new question
    newQuestion();
}

// Initialize the quiz when the page is loaded
document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("submit-btn").addEventListener("click", function () {
        if (total < 10) {
            checkAnswer();
        }
    });
    newQuestion(); // Load the first question
});
