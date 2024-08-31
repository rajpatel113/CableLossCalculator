// Function to toggle dark mode
function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");
    document.querySelector(".container").classList.toggle("dark-mode");
  }
// Button for Cableloss Website
 function AmpSetupTool() {
  window.open('https://rajpatel113.github.io/AmpSetupTool', '_blank');
}

// JavaScript code to handle the calculation logic
const lossData = {
    "QR 540": [0.44, 1.40, 1.56, 1.67, 1.85, 2.00, 2.17],
    "QR 715": [0.35, 1.12, 1.25, 1.34, 1.49, 1.60, 1.75],
    "QR 860": [0.30, 0.95, 1.06, 1.14, 1.24, 1.35, 1.44],
    "P3 412": [0.66, 2.11, 2.35, 2.52, 2.78, 3.00, 3.28],
    "P3 500": [0.52, 1.63, 1.82, 1.95, 2.16, 2.32, 2.52],
    "P3 625": [0.42, 1.35, 1.50, 1.60, 1.78, 1.90, 2.07],
    "P3 750": [0.35, 1.12, 1.24, 1.34, 1.49, 1.60, 1.74],
    "P3 875": [0.30, 0.97, 1.08, 1.17, 1.30, 1.40, 1.53],
    "P3 1000": [0.29, 0.90, 1.01, 1.09, 1.21, 1.31, 1.44],
    "P1 412": [0.74, 2.34, 2.48, 2.65, 2.94, 3.14, 3.46],
    "P1 500": [0.56, 1.85, 2.07, 2.23, 2.53, 2.70, 3.00],
    "P1 625": [0.50, 1.65, 1.85, 1.99, 2.26, 2.42, 2.68],
    "P1 750": [0.39, 1.29, 1.47, 1.60, 1.82, 1.95, 2.16],
    "P1 1000": [0.32, 1.07, 1.21, 1.33, 1.51, 1.62, 1.80],
    "P0 412": [0.77, 2.54, 2.85, 3.05, 3.39, 3.67, 4.00],
    "P0 500": [0.63, 2.07, 2.31, 2.51, 2.83, 3.06, 3.35],
    "P0 750": [0.43, 1.51, 1.71, 1.85, 2.07, 2.26, 2.50],
    "CW 875": [0.45, 1.47, 1.62, 1.74, 1.97, 2.13, 2.36],
    "NE 412": [0.69, 2.23, 2.53, 2.70, 3.00, 3.22, 3.54],
    "NE 500": [0.56, 1.80, 2.06, 2.22, 2.47, 2.70, 2.96],
    "NE 750": [0.41, 1.36, 1.57, 1.70, 1.90, 2.08, 2.30],
    "SELA 412": [0.69, 2.25, 2.54, 2.71, 3.01, 3.24, 3.54],
    "P3 RG6": [1.90, 5.90, 6.55, 6.95, 7.60, 8.00, 8.70],
    "P3 RG11": [1.05, 3.30, 3.70, 3.95, 4.35, 4.65, 5.10],
    "S 59U": [3.85, 12.00, 12.90, 13.50, 14.65, 15.30, 16.55],
    "F 59U": [3.95, 12.35, 13.25, 13.85, 15.00, 15.65, 16.90],
    "S 6U": [1.95, 6.10, 6.70, 7.10, 7.75, 8.10, 8.85],
    "S 11U": [1.20, 3.75, 4.15, 4.40, 4.85, 5.15, 5.65],
    "F 11U": [1.10, 3.45, 3.85, 4.10, 4.50, 4.80, 5.25]
};

document.getElementById('lossCalculatorForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const cableType = document.getElementById('cableType').value;
    const length = parseFloat(document.getElementById('length').value);
    const lengthUnit = document.getElementById('lengthUnit').value;
    const frequency = parseFloat(document.getElementById('frequency').value);
    const additionalLoss = parseFloat(document.getElementById('additionalLoss').value) || 0;

    if (!cableType || isNaN(length) || isNaN(frequency)) {
        alert('Please fill in all required fields.');
        return;
    }

    const lossPer100ft = lossData[cableType];
    let lossIndex;

    if (frequency <= 50) {
        lossIndex = 0;
    } else if (frequency <= 450) {
        lossIndex = 1;
    } else if (frequency <= 550) {
        lossIndex = 2;
    } else if (frequency <= 600) {
        lossIndex = 3;
    } else if (frequency <= 750) {
        lossIndex = 4;
    } else if (frequency <= 870) {
        lossIndex = 5;
    } else {
        lossIndex = 6;
    }

    const lossFactor = lossPer100ft[lossIndex];

    const lengthInFeet = lengthUnit === 'm' ? length * 3.28084 : length;
    const totalLoss = (lengthInFeet / 100) * lossFactor + additionalLoss;

    document.getElementById('result').innerHTML = `
        <div class="alert alert-primary">
            <strong>Total Signal Loss:</strong> ${totalLoss.toFixed(2)} dB
        </div>
    `;
});