// Nav Bar
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Blur on scroll
window.addEventListener('scroll', function() {
    var header = document.getElementById('sticky-header');
    if (window.scrollY > 50) { // Trigger blur after scrolling 50px
        header.classList.add('blurred');
    } else {
        header.classList.remove('blurred');
    }
});

// JavaScript function to toggle expand/collapse of the additional items in each section
        function toggleExpand(listId, btn) {
            const list = document.getElementById(listId);
            if (list.style.display === 'none' || list.style.display === '') {
                list.style.display = 'block';
                btn.textContent = 'See Less';
            } else {
                list.style.display = 'none';
                btn.textContent = 'See More';
            }
        }
        
document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".inspiration-card");

  const showCardsOnScroll = () => {
    const triggerBottom = window.innerHeight * 0.8;

    cards.forEach((card) => {
      const cardTop = card.getBoundingClientRect().top;

      if (cardTop < triggerBottom) {
        card.classList.add("show");
      }
    });
  };

  window.addEventListener("scroll", showCardsOnScroll);
  showCardsOnScroll(); // Run on load in case some cards are in view
});


//text animetion
const phrases = [
  "Empowering Young Minds",
  "Building a Brighter Future",
  "Shaping the Leaders of Tomorrow",
];
let currentPhraseIndex = 0;
let currentCharIndex = 0;
let isDeleting = false;

const animatedText = document.getElementById("animated-text");

function typeEffect() {
  const currentPhrase = phrases[currentPhraseIndex];
  if (isDeleting) {
    currentCharIndex--;
  } else {
    currentCharIndex++;
  }

  animatedText.textContent = currentPhrase.substring(0, currentCharIndex);

  if (!isDeleting && currentCharIndex === currentPhrase.length) {
    // Pause before deleting
    isDeleting = true;
    setTimeout(typeEffect, 1000);
  } else if (isDeleting && currentCharIndex === 0) {
    // Move to the next phrase
    isDeleting = false;
    currentPhraseIndex = (currentPhraseIndex + 1) % phrases.length;
    setTimeout(typeEffect, 500);
  } else {
    setTimeout(typeEffect, isDeleting ? 50 : 100);
  }
}

// Start the animation
typeEffect();