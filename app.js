const map = L.map("map").setView([37.8, -96], 5);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Load CSV data using D3.js
d3.csv("output_data/temp_humidity.csv").then(data => {
  const uniqueDates = [...new Set(data.map(d => d.date))];
  const dropdown = document.getElementById("dateDropdown");
  uniqueDates.forEach(date => {
    const option = document.createElement("option");
    option.value = date;
    option.text = date;
    dropdown.appendChild(option);
  });
  
  // Initialize the map with default data (first date in the dropdown)
  updateMap(uniqueDates[0]);

  dropdown.addEventListener("change", event => {
    const selectedDate = event.target.value;
    updateMap(selectedDate);
  });
}).catch(error => {
  console.error("Error loading data:", error);
});

function updateMap(selectedDate) {
  // Clear existing markers from the map
  map.eachLayer(layer => {
    if (layer instanceof L.Marker) {
      map.removeLayer(layer);
    }
  });

  d3.csv("output_data/temp_humidity.csv").then(data => {
    const selectedData = data.filter(d => d.date === selectedDate);
    
    selectedData.forEach(d => {
      const lat = +d.latitude;
      const lon = +d.longitude;
      const feelslike = +d.feelslike;
      const humidity = +d.humidity;
      const city = d.city;

      const marker = L.marker([lat, lon])
        .addTo(map)
        .bindPopup(`City: ${city}<br>Feels Like: ${feelslike.toFixed(2)}°F<br>Humidity: ${humidity}%`);
    });
  }).catch(error => {
    console.error("Error loading data:", error);
  });
}