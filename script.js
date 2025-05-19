// script.js - extracted from index.html
// Tab navigation
function showTab(tabName, element) {
    const contents = document.querySelectorAll('.tab-content');
    contents.forEach(content => content.classList.remove('active'));
    document.getElementById(tabName).classList.add('active');

    const links = document.querySelectorAll('.sidebar-link');
    links.forEach(link => link.classList.remove('active'));
    if (element) {
        element.classList.add('active');
    }
    document.querySelector('main').scrollTop = 0;
}

// Accordion functionality
function toggleAccordion(headerElement) {
    const content = headerElement.nextElementSibling;
    const arrow = headerElement.querySelector('.arrow');
    content.classList.toggle('open');
    if (content.classList.contains('open')) {
        arrow.style.transform = 'rotate(180deg)';
    } else {
        arrow.style.transform = 'rotate(0deg)';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    showTab('home', document.querySelector('.sidebar-link'));
    document.querySelectorAll('.accordion-content').forEach(content => {
        content.classList.remove('open');
        const arrow = content.previousElementSibling.querySelector('.arrow');
        if (arrow) arrow.style.transform = 'rotate(0deg)';
    });
});

// Twist Modal
const twistModal = document.getElementById('twistModal');
const twistContentEl = document.getElementById('twistContent');
const twists = [
    {
        title: "Twist 1: Major Funder Pulls Out!",
        description: "Breaking News: One of the primary private investors (£5 million commitment) for the stadium project has unexpectedly withdrawn their support due to an internal financial crisis."
    },
    {
        title: "Twist 2: Rival Club Announcement!",
        description: "Local rivals, 'Harrow Hornets FC', also in the National League, announce plans for a significant upgrade to their existing stadium, including new community facilities, just 5 miles from Barnet's proposed site."
    }
];
let currentTwist = twists[Math.floor(Math.random() * twists.length)];

function openTwistModal() {
    twistContentEl.innerHTML = `
        <h3 class="text-xl font-semibold text-red-500 mb-2">${currentTwist.title}</h3>
        <p>${currentTwist.description}</p>
    `;
    twistModal.style.display = 'block';
}

function closeTwistModal() {
    twistModal.style.display = 'none';
}

window.onclick = function(event) {
    if (event.target == twistModal) {
        closeTwistModal();
    }
}

// Timer controls
const timerDisplay = document.getElementById('timerDisplay');
document.getElementById('toggleTimerControls').addEventListener('click', function() {
    const controlsPanel = document.getElementById('timerControlsPanel');
    const icon = document.getElementById('timerControlsIcon');
    controlsPanel.classList.toggle('hidden');
    if (controlsPanel.classList.contains('hidden')) {
        icon.textContent = '▼';
        icon.style.transform = 'rotate(0deg)';
    } else {
        icon.textContent = '▲';
        icon.style.transform = 'rotate(180deg)';
    }
});

let timerInterval;
let timeLeft = 0;
let initialTimeSet = 0;

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

function startTimer() {
    clearInterval(timerInterval);
    if (timeLeft <= 0 && initialTimeSet > 0) {
        timeLeft = initialTimeSet;
    } else if (timeLeft <= 0) {
        timerDisplay.textContent = formatTime(0);
        return;
    }
    timerInterval = setInterval(() => {
        timeLeft--;
        timerDisplay.textContent = formatTime(timeLeft);
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            timerDisplay.textContent = "Time's Up!";
        }
    }, 1000);
}

function setTimer(minutes, isSecondThirtyMin = false) {
    pauseTimer();
    timeLeft = minutes * 60;
    initialTimeSet = timeLeft;
    timerDisplay.textContent = formatTime(timeLeft);
    startTimer();
}

function startCustomTimer() {
    const customMinutesInput = document.getElementById('customTime');
    const customMinutes = parseInt(customMinutesInput.value);
    if (isNaN(customMinutes) || customMinutes <= 0) {
        alert("Please enter a valid number of minutes.");
        return;
    }
    setTimer(customMinutes);
    customMinutesInput.value = '';
}

function pauseTimer() {
    clearInterval(timerInterval);
}

function resetTimer() {
    clearInterval(timerInterval);
    if (initialTimeSet > 0) {
        timeLeft = initialTimeSet;
    } else {
        timeLeft = 0;
    }
    timerDisplay.textContent = formatTime(timeLeft);
}
timerDisplay.textContent = formatTime(timeLeft);
