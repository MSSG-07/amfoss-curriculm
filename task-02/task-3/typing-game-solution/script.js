const quotes = [
    'When you have eliminated the impossible, whatever remains, however improbable, must be the truth.',
    'There is nothing more deceptive than an obvious fact.',
    'I ought to know by this time that when a fact appears to be opposed to a long train of deductions it invariably proves to be capable of bearing some other interpretation.',
    'I never make exceptions. An exception disproves the rule.',
    'What one man can invent another can discover.',
    'Nothing clears up a case so much as stating it to another person.',
    'Education never ends, Watson. It is a series of lessons, with the greatest for the last.',
];
let words = [];
let wordIndex = 0;
let startTime = Date.now();
const quoteElement = document.getElementById('quote');
const messageElement = document.getElementById('message');
const typedValueElement = document.getElementById('typed-value');

let highScore = localStorage.getItem('highScore') ? parseFloat(localStorage.getItem('highScore')) : Infinity;
function updateHighScoreDisplay() {
  const highScoreElement = document.getElementById('high-score'); 
  if (highScoreElement) {  
      if (highScore !== Infinity) {
          highScoreElement.innerText = `High Score: ${highScore.toFixed(2)} milli sec`;
      } else {
          highScoreElement.innerText = `High Score: -- sec`;
      }
  } else {
      console.error("ERROR: High score element not found!");
  }
}
document.addEventListener('DOMContentLoaded', updateHighScoreDisplay);
const popup = document.getElementById('popup');
const closeBtn = document.getElementById('closeBtn');

  closeBtn.addEventListener('click', () => {
      popup.classList.remove("open-popup");
      popup.style.visibility = "hidden";
      popup.style.transform = "translate(-50%, -50%) scale(0.1)";
      typedValueElement.value = '';
  });

document.getElementById('start').addEventListener('click', () => {
    const quoteIndex = Math.floor(Math.random() * quotes.length);
    const quote = quotes[quoteIndex];
    words = quote.split(' ');
    wordIndex = 0;
    const spanWords = words.map(function(word) { return `<span>${word} </span>`});
    quoteElement.innerHTML = spanWords.join('');
    quoteElement.childNodes[0].className = 'highlight';
    messageElement.innerText = '';
    typedValueElement.value = '';
    typedValueElement.focus();
    startTime = new Date().getTime();
    typedValueElement.disabled = false;
  });
typedValueElement.addEventListener('input', () => {
    const currentWord = words[wordIndex];
    const typedValue = typedValueElement.value;  
    if (typedValue === currentWord && wordIndex === words.length - 1) {
      const elapsedTime = new Date().getTime() - startTime;
      const message = `CONGRATULATIONS! You finished in ${elapsedTime / 1000} seconds.`;
      messageElement.innerText = message;
      typedValueElement.disabled = true;
      
      popup.style.visibility = "visible";
      popup.style.transform = "translate(-50%, -50%) scale(1)";
      popup.classList.add("open-popup");

      if (elapsedTime < highScore) {
        highScore = elapsedTime;
        localStorage.setItem('highScore', highScore.toFixed(2)); 
        updateHighScoreDisplay(); 
        messageElement.innerText += ` New High Score!`;
    }
    
       


    } else if (typedValue.endsWith(' ') && typedValue.trim() === currentWord) {
      typedValueElement.value = '';
      wordIndex++;
      for (const wordElement of quoteElement.childNodes) {
        wordElement.className = '';
      }
      quoteElement.childNodes[wordIndex].className = 'highlight';
    } else if (currentWord.startsWith(typedValue)) {
      typedValueElement.className = '';
    } else {
      typedValueElement.className = 'error';
    }
  });
  closeBtn.addEventListener('click', () => {
    popup.classList.remove("open-popup");
    popup.style.visibility = "hidden";
    popup.style.transform = "translate(-50%, -50%) scale(0.1)";
    typedValueElement.value = '';
});