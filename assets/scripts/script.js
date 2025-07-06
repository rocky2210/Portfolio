// Js

// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }

// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");

const pages = document.querySelectorAll("[data-page]");


// Contact form
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

for (let i = 0; i < formInputs.length; i++) {
    formInputs[i].addEventListener("input", function () {

      // check form validation
    if (form.checkValidity()) {
        formBtn.removeAttribute("disabled");
    } else {
        formBtn.setAttribute("disabled", "");
    }
    });
}

// Mouse click spark animation

class ClickSpark extends HTMLElement {
    constructor() {
    super();
    this.attachShadow({ mode: "open" });
}

connectedCallback() {
    this.shadowRoot.innerHTML = this.createSpark();
    this.svg = this.shadowRoot.querySelector("svg");
    this._parent = this.parentNode;
    this._parent.addEventListener("click", this);
}

disconnectedCallback() {
    this._parent.removeEventListener("click", this);
    delete this._parent;
}

handleEvent(e) {
    this.setSparkPosition(e);
    this.animateSpark();
}

animateSpark() {
    let sparks = [...this.svg.children];
    let size = parseInt(sparks[0].getAttribute("y1"));
    let offset = size / 2 + "px";

    let keyframes = (i) => {
      let deg = `calc(${i} * (360deg / ${sparks.length}))`;

    return [
        {
          strokeDashoffset: size * 3,
            transform: `rotate(${deg}) translateY(${offset})`
        },
        {
            strokeDashoffset: size,
            transform: `rotate(${deg}) translateY(0)`
        }
        ];
    };

    let options = {
        duration: 660,
        easing: "cubic-bezier(0.25, 1, 0.5, 1)",
        fill: "forwards"
    };

    sparks.forEach((spark, i) => spark.animate(keyframes(i), options));
}

setSparkPosition(e) {
    this.style.left = e.pageX - this.clientWidth / 2 + "px";
    this.style.top = e.pageY - this.clientHeight / 2 + "px";
}

createSpark() {
    return `
        <style>
        :host {
            position: absolute;
            pointer-events: none;
            z-index: 10;
        }
        </style>
        <svg width="30" height="30" viewBox="0 0 100 100" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="4" stroke="hsl(128, 100%, 68%)" transform="rotate(-20)">
        ${Array.from(
            { length: 8 },
            (_) =>
            `<line x1="50" y1="30" x2="50" y2="4" stroke-dasharray="30" stroke-dashoffset="30" style="transform-origin: center" />`
        ).join("")}
        </svg>
    `;
    }
}

customElements.define("click-spark", ClickSpark);



// Fade in and fade out title
(function() {

var quotes = $(".quotes");
var quoteIndex = -1;

function showNextQuote() {
++quoteIndex;
quotes.eq(quoteIndex % quotes.length)
.fadeIn(1000)
.delay(500)
.fadeOut(1000, showNextQuote);
}
showNextQuote();

})();


// Bubble loader script
document.addEventListener("DOMContentLoaded", function () {
    const bubbleWrap = document.querySelector('.bubble-wrap');
    const bubbleCount = 100; // Number of bubbles

    for (let i = 0; i < bubbleCount; i++) {
        const bubble = document.createElement('div');
        bubble.className = 'bubble';
        const size = Math.random() * 30 + 1; // Random size between 1 and 30
        bubble.style.height = `${size}px`;
        bubble.style.width = `${size}px`;
        bubble.style.animationDelay = `${-(Math.random() * 10)}s`;
        bubble.style.transform = `translate3d(${Math.random() * 1000}px, ${Math.random() * 1000}px, ${Math.random() * 2000}px)`;
        bubble.style.background = 'hsl(128, 100%, 68%)';
        bubbleWrap.appendChild(bubble);
    }

    // Hide loader after 5 seconds or once the main content is fully loaded
    setTimeout(function () {
        document.getElementById('bubble-loader').style.display = 'none';
        document.body.style.overflow = 'auto'; // Enable scrolling
    }, 2000);
});


function initSparkleAnimation(selector) {
  const rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

  const animate = star => {
    star.style.left = `${rand(-10, 100)}%`;
    star.style.top = `${rand(-40, 80)}%`;
    star.style.animation = "none";
    void star.offsetHeight; // trigger reflow
    star.style.animation = "";
  };

  const container = document.querySelector(selector);
  if (!container) return;

  const stars = container.querySelectorAll('.magic-star');
  let index = 0;
  const interval = 1000;

  for (const star of stars) {
    setTimeout(() => {
      animate(star);
      setInterval(() => animate(star), interval);
    }, index++ * (interval / 3));
  }
}


const skillSpans = document.querySelectorAll('.scroll div span');

skillSpans.forEach(span => {
    // Add the shine class
    span.classList.add('text-shine');

    // Optional: Add soft border glow
    span.style.border = `1px solid #666`;
    span.style.padding = '6px 12px';
    span.style.margin = '4px';
    span.style.display = 'inline-block';
    span.style.borderRadius = '6px';
    // span.style.boxShadow = `0 0 6px rgba(255,255,255,0.1), 0 0 12px rgba(255,255,255,0.05)`;

    // Optional hover (darken background)
    span.addEventListener('mouseenter', () => {
        span.style.backgroundColor = '#444';
    });
    span.addEventListener('mouseleave', () => {
        span.style.backgroundColor = '#222';
    });
});
