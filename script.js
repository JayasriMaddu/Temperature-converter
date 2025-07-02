function convertTemperature() {
  const tempInput = document.getElementById("temperatureInput").value;
  const selectedUnit = document.querySelector('input[name="unit"]:checked').value;
  const resultDisplay = document.getElementById("resultDisplay");
  const loader = document.getElementById("loader");
  const mercury = document.getElementById("mercury");

  if (tempInput === "" || isNaN(tempInput)) {
    resultDisplay.textContent = "❌ Please enter a valid number.";
    resultDisplay.style.color = "#e74c3c";
    mercury.style.width = "0%";
    mercury.style.background = "none";
    return;
  }
  resultDisplay.textContent = "";
  loader.style.display = "block";
  mercury.style.width = "0%";
  mercury.style.background = "none";
  setTimeout(() => {
    loader.style.display = "none";
    const temp = parseFloat(tempInput);
    let result = "";
    let tempCelsius = 0;
    let label = "";

    if (selectedUnit === "celsius") {
      tempCelsius = temp;
      const toF = (temp * 9 / 5) + 32;
      const toK = temp + 273.15;
      result = `${temp}°C = ${toF.toFixed(2)}°F, ${toK.toFixed(2)}K`;
    } else if (selectedUnit === "fahrenheit") {
      tempCelsius = (temp - 32) * 5 / 9;
      const toK = tempCelsius + 273.15;
      result = `${temp}°F = ${tempCelsius.toFixed(2)}°C, ${toK.toFixed(2)}K`;
    } else if (selectedUnit === "kelvin") {
      tempCelsius = temp - 273.15;
      const toF = (tempCelsius * 9 / 5) + 32;
      result = `${temp}K = ${tempCelsius.toFixed(2)}°C, ${toF.toFixed(2)}°F`;
    }

    let width = Math.min(Math.max((tempCelsius + 30) * 1.2, 0), 100);
    mercury.style.width = width + "%";

    if (tempCelsius <= 10) {
      mercury.style.background = "#00c6ff"; 
      label = " ❄️ (Cold)";
    } else if (tempCelsius > 10 && tempCelsius <= 30) {
      mercury.style.background = "#ffcc00";
      label = " 🌤️ (Warm)";
    } else {
      mercury.style.background = "#ff4b2b"; 
      label = " 🔥 (Hot)";
    }
    resultDisplay.style.color = "#2c3e50";
    resultDisplay.textContent = result + label;
  }, 1000);
}
function resetForm() {
  document.getElementById("temperatureInput").value = "";
  document.getElementById("resultDisplay").textContent = "";
  document.getElementById("mercury").style.width = "0%";
  document.getElementById("mercury").style.background = "none";
  document.getElementById("loader").style.display = "none";
  document.querySelector('input[name="unit"][value="celsius"]').checked = true;
}
