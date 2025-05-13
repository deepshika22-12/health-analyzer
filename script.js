let history = [];

function analyzeVitals() {
  const hr = parseInt(document.getElementById('hr').value);
  const bp = document.getElementById('bp').value;
  const spo2 = parseInt(document.getElementById('spo2').value);
  const temp = parseFloat(document.getElementById('temp').value);

  let risk = "Good";
  let color = "#4CAF50"; // Green for Good

  if (hr < 60 || hr > 100 || spo2 < 95 || temp > 37.5 || temp < 35) {
    risk = "Caution";
    color = "#FF9800"; // Orange for Caution
  }

  if (spo2 < 90 || temp > 39 || hr > 130) {
    risk = "High Risk";
    color = "#F44336"; // Red for High Risk
  }

  document.getElementById("riskMessage").textContent = risk;
  document.getElementById("resultBox").style.backgroundColor = color;

  // Add to history
  history.push({ time: new Date().toLocaleTimeString(), spo2 });
  if (history.length > 10) history.shift(); // Keep only last 10 entries
  drawChart();
}

function drawChart() {
  const ctx = document.getElementById('historyChart').getContext('2d');
  
  new Chart(ctx, {
    type: 'line',
    data: {
      labels: history.map(h => h.time),
      datasets: [{
        label: 'Oxygen Level Over Time',
        data: history.map(h => h.spo2),
        borderColor: '#FF4E50', // Red for line color
        fill: false,
        tension: 0.1
      }]
    },
    options: {
      responsive: true,
      scales: {
        y: {
          min: 80,
          max: 100
        },
        x: {
          ticks: {
            display: true,
            maxRotation: 45,
            minRotation: 0
          }
        }
      },
      plugins: {
        legend: {
          labels: {
            color: '#5d4b8c' // Pastel font color for legend
          }
        }
      }
    }
  });
}
