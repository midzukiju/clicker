let score = Number(localStorage.getItem('score')) || 0;
let totalClicks = Number(localStorage.getItem('totalClicks')) || 0;
let clickPower = Number(localStorage.getItem('clickPower')) || 1;
let upgradeCost = Number(localStorage.getItem('upgradeCost')) || 10;
let autoPower = Number(localStorage.getItem('autoPower')) || 0;
let autoCost = Number(localStorage.getItem('autoCost')) || 25;

const scoreEl = document.getElementById('score');
const clicksCountEl = document.getElementById('clicks-count');
const clickPowerEl = document.getElementById('click-power');
const autoPowerEl = document.getElementById('auto-power');
const messageEl = document.getElementById('message');
const clickBtn = document.getElementById('click-btn');
const upgradeBtn = document.getElementById('upgrade-btn');
const upgradeCostEl = document.getElementById('upgrade-cost');
const autoBtn = document.getElementById('auto-btn');
const autoCostEl = document.getElementById('auto-cost');

function saveGame() {
    localStorage.setItem('score', score);
    localStorage.setItem('totalClicks', totalClicks);
    localStorage.setItem('clickPower', clickPower);
    localStorage.setItem('upgradeCost', upgradeCost);
    localStorage.setItem('autoPower', autoPower);
    localStorage.setItem('autoCost', autoCost);
}

function updateUI() {
    scoreEl.textContent = score;
    clicksCountEl.textContent = totalClicks;
    clickPowerEl.textContent = clickPower;
    autoPowerEl.textContent = autoPower;
    upgradeCostEl.textContent = upgradeCost;
    autoCostEl.textContent = autoCost;

    upgradeBtn.disabled = score < upgradeCost;
    autoBtn.disabled = score < autoCost;

    if (score >= 50) {
        messageEl.textContent = 'Ты в деле! 🔥';
    }

    saveGame();
}

clickBtn.addEventListener('click', () => {
    score += clickPower;
    totalClicks++;
    updateUI();
});

upgradeBtn.addEventListener('click', () => {
    if (score >= upgradeCost) {
        score -= upgradeCost;
        clickPower++;
        upgradeCost *= 2;
        updateUI();
    }
});

autoBtn.addEventListener('click', () => {
    if (score >= autoCost) {
        score -= autoCost;
        autoPower++;
        autoCost = Math.round(autoCost * 1.5);
        updateUI();
    }
});

setInterval(() => {
    if (autoPower > 0) {
        score += autoPower;
        updateUI();
    }
}, 1000);

updateUI();