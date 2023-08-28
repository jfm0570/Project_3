// Part 1: Temperature and Humidity Map

// Initialize the map
const map = L.map("map").setView([37.8, -96], 5); // Adjust initial view

// Add a tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Adding a custom control for the title
const titleControl = L.control({ position: 'topleft' });

titleControl.onAdd = function (map) {
  const div = L.DomUtil.create('div', 'map-title');
  div.innerHTML = '<h2>Feels Like Temperature °F </h2>';
  return div;
};

titleControl.addTo(map);

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
  // Update map and UV Index chart
  function updateMapAndChart(selectedDate) {
  updateMap(selectedDate);
  updateUVIndexChart(selectedDate);
}
    d3.csv("output_data/temp_humidity.csv").then(data => {
      const selectedData = data.filter(d => d.date === selectedDate);
      
      d3.csv("output_data/temp_humidity.csv").then(data => {
        const selectedData = data.filter(d => d.date === selectedDate);
            
        selectedData.forEach(d => {
          const lat = +d.latitude;
          const lon = +d.longitude;
          const feelslike = +d.feelslike;
          const feelslikemin = +d.feelslikemin;
          const feelslikemax = +d.feelslikemax;
          const temp = +d.temp;
          const tempmin = +d.tempmin;
          const tempmax = +d.tempmax;
          const humidity = +d.humidity;
          const city = d.city;
        
          const customIcon = L.divIcon({
            className: 'custom-icon',
            html: `
              <div class="feels-like">${feelslike.toFixed(2)}°F</div>

            `
          });
          const popupContent = `
            <strong>City:</strong> ${city}<br>
            <strong>Feels Like Min:</strong> ${feelslikemin.toFixed(2)}°F<br>
            <strong>Feels Like Max:</strong> ${feelslikemax.toFixed(2)}°F<br>
            <strong>Temperature:</strong> ${temp.toFixed(2)}°F<br>
            <strong>Temperature Min:</strong> ${tempmin.toFixed(2)}°F<br>
            <strong>Temperature Max:</strong> ${tempmax.toFixed(2)}°F<br>
            <strong>Humidity:</strong> ${humidity}%<br>
          `;
        
          const marker = L.marker([lat, lon], { icon: customIcon })
            .addTo(map)
            marker.bindPopup(popupContent);
        });
      }).catch(error => {
        console.error("Error loading data:", error);
      });
      
})}

// Part 2: UV Index Map

let data; // Define data in a higher scope
let uvMap; // Define a separate map for UV index markers

// Load CSV data using D3.js
d3.csv("output_data/full_data.csv").then(function(results) {
  data = results; // Assign the loaded data to the higher scope variable

  const uniqueDates = [...new Set(data.map(d => d.date))];
  const dateDropdown = document.getElementById("dateDropdown");
  uniqueDates.forEach(date => {
    const option = document.createElement("option");
    option.value = date;
    option.text = date;
    dateDropdown.appendChild(option);
  });

  // Initialize the UV map with default data (first date in the dropdown)
  initializeUVMap(uniqueDates[0]);

  dateDropdown.addEventListener("change", event => {
    const selectedDate = event.target.value;
    updateUVMap(selectedDate);
    updateUVIndexChart(selectedDate);
  });
}).catch(function(error) {
  console.error("Error loading data:", error);
});

// Initialize the UV map
function initializeUVMap(initialDate) {
  uvMap = L.map("uvMap").setView([37.8, -96], 5); // Adjust initial view
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(uvMap);

  updateUVMap(initialDate);
}

// Update UV map with UV index markers
function updateUVMap(selectedDate) {
  // Clear existing markers from the UV map
  if (uvMap) {
    uvMap.eachLayer(layer => {
      if (layer instanceof L.Marker) {
        uvMap.removeLayer(layer);
      }
    });

    // Filter data for the selected date
    const selectedData = data.filter(d => d.date === selectedDate);

    // Create markers for each city and add to the UV map
    selectedData.forEach(d => {
      const lat = +d.latitude;
      const lon = +d.longitude;
      const uvIndex = +d.uv_index;
      const city = d.city;

      const customIcon = L.divIcon({
        className: 'custom-icon',
        html: `<div class="uv-index-marker">${uvIndex}</div>`
      });

      const marker = L.marker([lat, lon], { icon: customIcon }).addTo(uvMap);
      marker.bindPopup(`<strong>${city}</strong><br>UV Index: ${uvIndex}`);
    });
  }
}

// Function to retrieve UV Index data based on selected date
function getUVIndexData(selectedDate) {
  const uvIndexData = []; // Array to store UV index values

  // Filter the data for the selected date and extract UV index values
  const selectedData = data.filter(d => d.date === selectedDate);
  selectedData.forEach(d => {
    uvIndexData.push(d.uv_index);
  });

  const dateLabels = selectedData.map(d => d.date); // Use date as labels

  return {
    labels: dateLabels,
    values: uvIndexData,
  };
}


//--------------------------------------------------------------------------------------------------------------------------

// Part 3: Temperature and Precipitation Graph

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
          name: d.date,
          hoverinfo: 'none'
        };
        traces.push(temperatureTrace);
      });
      
  
      const layout = {
        title: `Daily Temperature in ${selectedCity} May 2023-July 2023`,
        xaxis: { title: 'Date' },
        yaxis: { title: 'Temperature (°F)' },
        showlegend: false 
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
 // Load CSV data using D3.js for the temperature graph
 d3.csv("output_data/precipitation.csv").then(data => {
  // Extract unique city names from the CSV data
const uniqueCities = [...new Set(data.map(d => d.city))];
// Create a function to update the precipitation graph
function updatePrecipitationGraph(selectedCity) {
  const cityData = data.filter(d => d.city === selectedCity);

  const traces = [];

  cityData.forEach(d => {
    const precipitationTrace = {
      x: cityData.map(item => item.date),
      y: cityData.map(item => item.precipitation), 
      type: 'scatter',
      mode: 'lines+markers',
      name: d.date,
      hoverinfo: 'none'
    };
    traces.push(precipitationTrace);
  });

  const layout = {
    title: `Daily Precipitation in ${selectedCity} May 2023-July 2023`,
    xaxis: { title: 'Date' },
    yaxis: { title: 'Precipitation (inches)' },
    showlegend: false
  };

  Plotly.newPlot('precipitationChart', traces, layout);
}

// Call the precipitation function when the city dropdown changes
cityDropdown.addEventListener("change", () => {
  const selectedCity = cityDropdown.value;
  updatePrecipitationGraph(selectedCity);
});
 })
