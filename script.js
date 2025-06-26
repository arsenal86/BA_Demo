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
// This function will be modified later if PESTLE items are dynamically created.
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

    // Fetch workshop content
    fetchWorkshopContent();
});

let workshopContent = {}; // Global variable to store workshop content

async function fetchWorkshopContent() {
    try {
        const response = await fetch('workshop.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        workshopContent = await response.json();
        console.log('Workshop content loaded successfully:', workshopContent);
        populateContent(); // Call populateContent after fetching
    } catch (error) {
        console.error('Error fetching workshop.json:', error);
    }
}

function populateContent() {
    console.log('Populating content with:', workshopContent);

    // Home Tab
    if (workshopContent.home) {
        const homeTab = document.getElementById('home');
        homeTab.querySelector('h2').textContent = workshopContent.home.title;
        homeTab.querySelector('p.text-lg.mb-3').textContent = workshopContent.home.intro;
        homeTab.querySelector('p.text-lg.font-semibold.mb-2').textContent = workshopContent.home.goal.title;
        homeTab.querySelector('p.mb-4').textContent = workshopContent.home.goal.text;

        const agendaTitle = homeTab.querySelector('h3.text-2xl.font-semibold.text-sky-600.mb-3');
        if (agendaTitle && agendaTitle.textContent.includes("Agenda")) {
            agendaTitle.textContent = workshopContent.home.agenda.title;
            const agendaList = agendaTitle.nextElementSibling;
            if (agendaList && agendaList.tagName === 'UL') {
                agendaList.innerHTML = workshopContent.home.agenda.items.map(item => `<li>${item}</li>`).join('');
            }
        }

        const collaborationTitle = homeTab.querySelector('h3.text-2xl.font-semibold.text-sky-600.mb-3:nth-of-type(2)');
        if (collaborationTitle && collaborationTitle.textContent.includes("Collaboration")) {
            collaborationTitle.textContent = workshopContent.home.collaboration.title;
            const groupDivs = collaborationTitle.nextElementSibling;
            if (groupDivs && groupDivs.classList.contains('grid')) {
                const groups = workshopContent.home.collaboration.groups;
                const groupElements = groupDivs.querySelectorAll('.p-6.bg-white.rounded-lg.shadow');
                groupElements.forEach((el, index) => {
                    if (groups[index]) {
                        el.querySelector('h4').textContent = groups[index].name;
                        el.querySelector('a').href = groups[index].miroLink;
                    }
                });
            }
            const startButton = homeTab.querySelector('button.bg-sky-500');
            if (startButton) {
                startButton.textContent = workshopContent.home.collaboration.buttonText;
            }
        }
    }

    // PESTLE Tab
    if (workshopContent.pestle && workshopContent.pestle.items) {
        const pestleTab = document.getElementById('pestle');
        const pestleContainer = pestleTab.querySelector('.card .space-y-3');

        pestleTab.querySelector('h2').textContent = workshopContent.pestle.title;
        const pestleIntroParas = pestleTab.querySelectorAll('.card > p');
        pestleIntroParas[0].innerHTML = `<strong>Objective:</strong> ${workshopContent.pestle.objective}`;
        pestleIntroParas[1].innerHTML = `<strong>Your Task:</strong> ${workshopContent.pestle.task}`;

        pestleContainer.innerHTML = ''; // Clear any hardcoded items, though it should be empty from previous step

        workshopContent.pestle.items.forEach(item => {
            const accordionItem = document.createElement('div');
            accordionItem.className = 'accordion-item';

            const header = document.createElement('div');
            header.className = 'accordion-header';
            header.setAttribute('onclick', 'toggleAccordion(this)');
            header.innerHTML = `
                <span class="font-semibold text-lg">${item.letter} - ${item.name}</span>
                <span class="arrow text-xl transform transition-transform duration-300">&#9660;</span>
            `;

            const content = document.createElement('div');
            content.className = 'accordion-content';
            let questionsHTML = item.promptingQuestions.map(q => `<li>${q}</li>`).join('');
            content.innerHTML = `
                <p class="font-medium mb-1">Prompting Questions:</p>
                <ul class="list-disc list-inside text-sm space-y-1 mb-2">
                    ${questionsHTML}
                </ul>
                <p class="font-medium text-red-600">Challenging Factor:</p>
                <p class="text-sm text-red-500">${item.challengingFactor}</p>
            `;

            accordionItem.appendChild(header);
            accordionItem.appendChild(content);
            pestleContainer.appendChild(accordionItem);
        });

        const nextButtonPestle = pestleTab.querySelector('button.bg-sky-500');
        if (nextButtonPestle) {
            nextButtonPestle.textContent = workshopContent.pestle.buttonText;
        }
    }

    // Stakeholder Tab
    if (workshopContent.stakeholders && workshopContent.stakeholders.personas) {
        const stakeholderTab = document.getElementById('stakeholder');
        const stakeholderContainer = document.getElementById('stakeholder-cards-container');

        stakeholderTab.querySelector('h2').textContent = workshopContent.stakeholders.title;
        const stakeholderIntroParas = stakeholderTab.querySelectorAll('.card > p');
        stakeholderIntroParas[0].innerHTML = `<strong>Objective:</strong> ${workshopContent.stakeholders.objective}`;
        // Activity steps are in an OL
        const activityStepsList = stakeholderTab.querySelector('.card ol');
        if (activityStepsList) {
            activityStepsList.innerHTML = workshopContent.stakeholders.activitySteps.map(step => `<li>${step}</li>`).join('');
        }

        stakeholderTab.querySelector('h3.text-xl.font-semibold.text-sky-600.mb-3').textContent = workshopContent.stakeholders.personasTitle;

        stakeholderContainer.innerHTML = ''; // Clear any placeholders

        workshopContent.stakeholders.personas.forEach(persona => {
            const card = document.createElement('div');
            card.className = 'p-4 border rounded-lg bg-slate-100';
            card.innerHTML = `
                <h4 class="font-bold">${persona.id}. ${persona.name}</h4>
                <p class="text-sm"><strong>Interests:</strong> ${persona.interests}</p>
                <p class="text-sm"><strong>Concerns:</strong> ${persona.concerns}</p>
                <p class="text-sm"><strong>Influence:</strong> ${persona.influence}</p>
            `;
            stakeholderContainer.appendChild(card);
        });

        const gridInfoTitle = stakeholderTab.querySelector('h3.text-xl.font-semibold.text-sky-600.mt-6.mb-3');
        if (gridInfoTitle && gridInfoTitle.textContent.includes("Interest/Influence Grid")) {
            gridInfoTitle.textContent = workshopContent.stakeholders.grid.title;
            const gridInfoP = gridInfoTitle.nextElementSibling;
            if (gridInfoP) gridInfoP.textContent = workshopContent.stakeholders.grid.description;
            const gridInfoList = gridInfoP.nextElementSibling;
            if (gridInfoList && gridInfoList.tagName === "UL") {
                gridInfoList.innerHTML = workshopContent.stakeholders.grid.categories.map(cat => `<li><strong>${cat.split(':')[0]}:</strong> ${cat.split(':')[1].trim()}</li>`).join('');
            }
            const gridReminderP = gridInfoList.nextElementSibling;
            if (gridReminderP) gridReminderP.textContent = workshopContent.stakeholders.grid.reminder;
        }

        const stakeholderButtons = stakeholderTab.querySelectorAll('.card button');
        if (stakeholderButtons.length === 2) {
            stakeholderButtons[0].textContent = workshopContent.stakeholders.buttons.twist;
            stakeholderButtons[1].textContent = workshopContent.stakeholders.buttons.next;
        }
    }


    // Scenario Tab
    if (workshopContent.scenario) {
        const scenarioTab = document.getElementById('scenario');
        scenarioTab.querySelector('h2').textContent = workshopContent.scenario.title;
        const scenarioParagraphs = scenarioTab.querySelectorAll('.card > p');
        scenarioParagraphs.forEach((p, index) => {
            if (workshopContent.scenario.paragraphs[index]) {
                p.innerHTML = workshopContent.scenario.paragraphs[index]; // Use innerHTML for potential links if any
            }
        });

        const snapshotTitle = scenarioTab.querySelector('h3.text-xl.font-semibold.mt-6.mb-2');
        if (snapshotTitle) {
            snapshotTitle.textContent = workshopContent.scenario.projectSnapshot.title;
            const snapshotList = snapshotTitle.nextElementSibling;
            if (snapshotList && snapshotList.tagName === 'UL') {
                snapshotList.innerHTML = workshopContent.scenario.projectSnapshot.items.map(item => `<li>${item}</li>`).join('');
            }
        }
        const videoIframe = scenarioTab.querySelector('iframe');
        if (videoIframe) {
            videoIframe.src = workshopContent.scenario.projectSnapshot.videoUrl;
        }
        const disclaimerDiv = scenarioTab.querySelector('.mt-6.p-4.bg-yellow-100');
        if (disclaimerDiv) {
            // Assuming the structure is <strong>Disclaimer:</strong> followed by the text
            const strongTag = disclaimerDiv.querySelector('strong');
            disclaimerDiv.innerHTML = ''; // Clear existing
            if (strongTag) disclaimerDiv.appendChild(strongTag); // Add back strong tag
            disclaimerDiv.innerHTML += ' ' + workshopContent.scenario.disclaimer.text; // Add new text
        }
        const nextButtonScenario = scenarioTab.querySelector('button.bg-sky-500');
        if (nextButtonScenario) {
            nextButtonScenario.textContent = workshopContent.scenario.buttonText;
        }
    }

    // CATWOE Tab
    if (workshopContent.catwoe) {
        const catwoeTab = document.getElementById('catwoe');
        catwoeTab.querySelector('h2').textContent = workshopContent.catwoe.title;
        const catwoeParas = catwoeTab.querySelectorAll('.card > p');
        // Ensure the strong tags for Objective and Task are included
        catwoeParas[0].innerHTML = `<strong>Objective:</strong> ${workshopContent.catwoe.objective}`;
        catwoeParas[1].innerHTML = `<strong>Your Task:</strong> ${workshopContent.catwoe.task}`;

        const frameworkTitle = catwoeTab.querySelector('h3.text-xl.font-semibold.text-sky-600.mb-3');
        if (frameworkTitle) {
            frameworkTitle.textContent = workshopContent.catwoe.framework.title;
            const frameworkList = frameworkTitle.nextElementSibling;
            if (frameworkList && frameworkList.tagName === 'UL') {
                frameworkList.innerHTML = workshopContent.catwoe.framework.items.map(item => `<li><strong>${item.letter} (${item.name}):</strong> ${item.description}</li>`).join('');
            }
        }

        const exampleTitle = catwoeTab.querySelector('h4.font-semibold.mb-2');
        if (exampleTitle) {
            exampleTitle.textContent = workshopContent.catwoe.example.title;
            const exampleList = exampleTitle.nextElementSibling;
            if (exampleList && exampleList.tagName === 'UL') {
                exampleList.innerHTML = workshopContent.catwoe.example.questions.map(q => `<li>${q}</li>`).join('');
            }
        }
        const nextButtonCatwoe = catwoeTab.querySelector('button.bg-sky-500');
        if (nextButtonCatwoe) {
            nextButtonCatwoe.textContent = workshopContent.catwoe.buttonText;
        }
    }

    // Presentations Tab
    if (workshopContent.presentations) {
        const presentationsTab = document.getElementById('presentations');
        presentationsTab.querySelector('h2').textContent = workshopContent.presentations.title;
        presentationsTab.querySelector('.card > p.text-lg.mb-3').textContent = workshopContent.presentations.intro;

        const focusTitle = presentationsTab.querySelector('h3.text-xl.font-semibold.text-sky-600.mb-2');
        if (focusTitle) {
            focusTitle.textContent = workshopContent.presentations.focus.title;
            const focusList = focusTitle.nextElementSibling;
            if (focusList && focusList.tagName === 'UL') {
                focusList.innerHTML = workshopContent.presentations.focus.items.map(item => `<li>${item}</li>`).join('');
            }
        }

        const promptsTitle = presentationsTab.querySelector('h3.text-xl.font-semibold.text-sky-600.mt-6.mb-2');
        if (promptsTitle) {
            promptsTitle.textContent = workshopContent.presentations.discussionPrompts.title;
            const promptsList = promptsTitle.nextElementSibling;
            if (promptsList && promptsList.tagName === 'UL') {
                promptsList.innerHTML = workshopContent.presentations.discussionPrompts.items.map(item => `<li>${item}</li>`).join('');
            }
        }
    }

    // Wrap-up Tab
    if (workshopContent.wrapup) {
        const wrapupTab = document.getElementById('wrapup');
        wrapupTab.querySelector('div.card > h2').textContent = workshopContent.wrapup.title; // First h2 in card

        const header = workshopContent.wrapup.header;
        const headerElement = wrapupTab.querySelector('header.text-center');
        if (headerElement) {
            headerElement.querySelector('h1').textContent = header.title;
            headerElement.querySelector('p').textContent = header.subtitle;
        }

        const frameworks = workshopContent.wrapup.frameworksSection;
        const pestleCard = wrapupTab.querySelector('.grid .bg-white.rounded-lg.shadow-lg:nth-child(1)'); // PESTLE Card
        if (pestleCard) {
            pestleCard.querySelector('h2').textContent = frameworks.pestle.title;
            pestleCard.querySelector('p.font-semibold').textContent = frameworks.pestle.subtitle;
            pestleCard.querySelector('p.mb-4.flex-grow').textContent = frameworks.pestle.description;
        }
        const stakeholderCard = wrapupTab.querySelector('.grid .bg-white.rounded-lg.shadow-lg:nth-child(2)'); // Stakeholder Card
        if (stakeholderCard) {
            stakeholderCard.querySelector('h2').textContent = frameworks.stakeholderAnalysis.title;
            stakeholderCard.querySelector('p.font-semibold').textContent = frameworks.stakeholderAnalysis.subtitle;
            stakeholderCard.querySelector('p.mb-4.flex-grow').textContent = frameworks.stakeholderAnalysis.description;
            const gridTexts = frameworks.stakeholderAnalysis.grid;
            const gridDivs = stakeholderCard.querySelectorAll('.grid div');
            if (gridDivs.length === 4) { // Make sure we have the 4 grid cells
                 gridDivs[0].innerHTML = `${gridTexts.keepSatisfied.split('(')[0]}<span class="text-xs font-light">(${gridTexts.keepSatisfied.split('(')[1]}`;
                 gridDivs[1].innerHTML = `${gridTexts.manageClosely.split('(')[0]}<span class="text-xs font-light">(${gridTexts.manageClosely.split('(')[1]}`;
                 gridDivs[2].innerHTML = `${gridTexts.monitor.split('(')[0]}<span class="text-xs font-light">(${gridTexts.monitor.split('(')[1]}`;
                 gridDivs[3].innerHTML = `${gridTexts.keepInformed.split('(')[0]}<span class="text-xs font-light">(${gridTexts.keepInformed.split('(')[1]}`;
            }
        }
        const catwoeCardWrap = wrapupTab.querySelector('.grid .bg-white.rounded-lg.shadow-lg:nth-child(3)'); // CATWOE Card
        if (catwoeCardWrap) {
            catwoeCardWrap.querySelector('h2').textContent = frameworks.catwoe.title;
            catwoeCardWrap.querySelector('p.font-semibold').textContent = frameworks.catwoe.subtitle;
            catwoeCardWrap.querySelector('p.mb-4.flex-grow').textContent = frameworks.catwoe.description;
        }

        const flowchart = workshopContent.wrapup.flowchartSection;
        const flowchartSection = wrapupTab.querySelector('section.mb-10.text-center');
        if (flowchartSection) {
            flowchartSection.querySelector('h2').textContent = flowchart.title;
            flowchartSection.querySelector('p').textContent = flowchart.description;
            const flowDivs = flowchartSection.querySelectorAll('.flex-col.md\\:flex-row > div.bg-white');
            if (flowDivs.length === 6) { // 3 framework boxes + 3 result boxes
                flowDivs[0].textContent = flowchart.flows[0].from;
                flowDivs[1].textContent = flowchart.flows[0].to;
                flowDivs[2].textContent = flowchart.flows[1].from;
                flowDivs[3].textContent = flowchart.flows[1].to;
                flowDivs[4].textContent = flowchart.flows[2].from;
                flowDivs[5].textContent = flowchart.flows[2].to;
            }
        }

        const coreMessage = workshopContent.wrapup.coreMessageSection;
        const coreMessageSection = wrapupTab.querySelector('section.mb-10 .bg-white.rounded-lg.shadow-lg');
        if (coreMessageSection) {
            coreMessageSection.querySelector('h2').textContent = coreMessage.title;
            const pointsDivs = coreMessageSection.querySelectorAll('.grid.grid-cols-1.md\\:grid-cols-3 > div');
            pointsDivs.forEach((div, index) => {
                if (coreMessage.points[index]) {
                    div.querySelector('.text-4xl').textContent = coreMessage.points[index].icon;
                    div.querySelector('h3').textContent = coreMessage.points[index].title;
                    div.querySelector('p').textContent = coreMessage.points[index].description;
                }
            });
        }

        const collaborationFooter = workshopContent.wrapup.collaborationSection;
        const collaborationFooterSection = wrapupTab.querySelector('section:last-of-type .bg-\\[\\#2D3142\\]');
        if (collaborationFooterSection) {
            collaborationFooterSection.querySelector('h2').textContent = collaborationFooter.title;
            collaborationFooterSection.querySelector('p').textContent = collaborationFooter.description;
        }

        const footerWatermark = wrapupTab.parentElement.parentElement.querySelector('footer.w-full.text-center');
        if (footerWatermark && workshopContent.wrapup.footer) {
            footerWatermark.textContent = workshopContent.wrapup.footer;
        }
    }
}

// Twist Modal
const twistModal = document.getElementById('twistModal');
const twistContentEl = document.getElementById('twistContent');
// const twists = [...] // Hardcoded twists array removed

// let currentTwist = twists[Math.floor(Math.random() * twists.length)]; // Removed old initialization

function openTwistModal() {
    if (!workshopContent.twists || workshopContent.twists.length === 0) {
        console.error("No twists found in workshopContent.");
        twistContentEl.innerHTML = `<p>No twists available at the moment.</p>`;
        twistModal.style.display = 'block';
        return;
    }
    const randomTwist = workshopContent.twists[Math.floor(Math.random() * workshopContent.twists.length)];

    twistContentEl.innerHTML = `
        <h3 class="text-xl font-semibold text-red-500 mb-2">${randomTwist.title}</h3>
        <p>${randomTwist.description}</p>
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
