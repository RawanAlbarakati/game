var answer; 
var correct = 0; 
var incorrect = 0; 
var total = 0; 

var correctMessages = ["رائع جدًا! استمري هكذا!", "أنتِ نجمة!", "إجابتكِ ممتازة!", "مذهل! أنتِ مبدعة!"];
var incorrectMessages = ["حاولي مجددًا، أنتِ قادرة على ذلك!", "خطأ بسيط، يمكنكِ تحسينه!", "لا تقلقي، خذي نفسًا وحاولي مرة أخرى!", "قليل من التركيز وستنجحين!"];

function newQuestion() {
    if (total === 10) {
        calculateScore();
        return; 
    }

    var num1 = Math.floor(Math.random() * (13 - 3) + 3); 
    var num2 = Math.floor(Math.random() * (13 - 3) + 3);
    answer = num1 * num2;

    document.getElementById("question").textContent = "ما هو حاصل ضرب " + num1 + " في " + num2 + "؟";
    document.getElementById("answer").value = ""; 
    document.getElementById("feedback").textContent = ""; 
    document.getElementById("celebration-img").style.display = "none"; 
}

function checkAnswer() {
    var userAnswer = parseInt(document.getElementById("answer").value);

    if (isNaN(userAnswer)) {
        document.getElementById("feedback").textContent = "الرجاء إدخال رقم صحيح.";
        document.getElementById("feedback").className = "incorrect";
        return; 
    }

    total++; 

    if (userAnswer === answer) {
        correct++; 

        var feedback = correctMessages[Math.floor(Math.random() * correctMessages.length)];
        document.getElementById("feedback").textContent = feedback;
        document.getElementById("feedback").className = "correct";
        document.getElementById("celebration-img").style.display = "block"; 

        setTimeout(newQuestion, 2000);
    } else {
        incorrect++; 

        var feedback = incorrectMessages[Math.floor(Math.random() * incorrectMessages.length)];
        document.getElementById("feedback").textContent = feedback;
        document.getElementById("feedback").className = "incorrect";
    }

    if (total === 10) {
        calculateScore();
    }
}

function calculateScore() {
    var percentage = (correct / total) * 100;

    if (percentage < 75) {
        document.getElementById("score").textContent =
            "نتيجتكِ: " + percentage + "%. معلمتك استاذة نجوى حزينة، تتمنى لك مراجعة جدول الضرب 🥺!";
    } else {
       document.getElementById("score").textContent =
            "نتيجتكِ: " + percentage + "%. معلمتك استاذة نجوى فخورة بكِ 👍🏻 أنتِ متفوقة!!";
    }
    }

    setTimeout(resetQuiz, 5000); // Wait for 5 seconds before restarting
}

function resetQuiz() {
    correct = 0;
    incorrect = 0;
    total = 0;

    document.getElementById("feedback").textContent = "";
    document.getElementById("score").textContent = "";
    document.getElementById("celebration-img").style.display = "none";

    newQuestion();
}

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("submit-btn").addEventListener("click", function () {
        if (total < 10) {
            checkAnswer(); 
        }
    });
    newQuestion(); 
});
