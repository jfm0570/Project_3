// Initialize the map
const map = L.map("map").setView([37.8, -96], 5); // Adjust initial view

// Add a tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);
// Define the cityDropdown element
const cityDropdown = document.getElementById("selDataset");

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
 // Load CSV data using D3.js for the temperature graph
d3.csv("output_data/temp_humidity.csv").then(data => {
    // Extract unique city names from the CSV data
  const uniqueCities = [...new Set(data.map(d => d.city))];
  
  // Populate the city dropdown with unique city names
  uniqueCities.forEach(city => {
    const option = document.createElement("option");
    option.value = city;
    option.text = city;
    cityDropdown.appendChild(option);
  });

// Create a function to update the temperature graph
    function updateTemperatureGraph(selectedCity) {
      const cityData = data.filter(d => d.city === selectedCity);
  
      const traces = [];
  
      cityData.forEach(d => {
        const temperatureTrace = {
          x: cityData.map(item => item.date),
          y: cityData.map(item => item.temp),
          type: 'scatter',
          mode: 'lines+markers',
          name: d.date
        };
        traces.push(temperatureTrace);
      });
  
      const layout = {
        title: `Daily Temperature in ${selectedCity}`,
        xaxis: { title: 'Date' },
        yaxis: { title: 'Temperature (°F)' }
      };
  
      Plotly.newPlot('temperatureChart', traces, layout);
    }
  
    // Call the function when the city dropdown changes
    cityDropdown.addEventListener("change", () => {
      const selectedCity = cityDropdown.value;
      updateTemperatureGraph(selectedCity);
    });
  
  }).catch(error => {
    console.error("Error loading data:", error);
  });
  
