
        // Initialize the map
        const map = L.map("map").setView([37.8, -96], 5); // Adjust initial view

        // Add a tile layer
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        // Load CSV data using D3.js
        d3.csv("/Users/dennysurdiales/Desktop/Project_3/output_data/temp_humidity.csv").then(data => {
            // Extract unique dates from the CSV data
            const uniqueDates = [...new Set(data.map(d => d.date))];

            // Populate the dropdown with unique dates
            const dropdown = document.getElementById("dateDropdown");
            uniqueDates.forEach(date => {
                const option = document.createElement("option");
                option.value = date;
                option.text = date;
                dropdown.appendChild(option);
            });

            // Initialize the map with default data (first date in the dropdown)
            updateMap(uniqueDates[0]);

            // Listen for changes in the dropdown
            dropdown.addEventListener("change", event => {
                const selectedDate = event.target.value;
                updateMap(selectedDate);
            });
        }).catch(error => {
            console.error("Error loading data:", error);
        });

        // Function to update the map with "feels like" data for the selected date
        function updateMap(selectedDate) {
            // Clear existing markers from the map
            map.eachLayer(layer => {
                if (layer instanceof L.Marker) {
                    map.removeLayer(layer);
                }
            });

            // Load CSV data and create markers for the selected date
            d3.csv("/Users/dennysurdiales/Desktop/Project_3/output_data/temp_humidity.csv").then(data => {
                const selectedData = data.filter(d => d.date === selectedDate);

                selectedData.forEach(d => {
                    const lat = +d.latitude;
                    const lon = +d.longitude;
                    const feelslike = +d.feelslike;

                    const marker = L.marker([lat, lon])
                        .addTo(map)
                        .bindPopup(`City: ${d.city}<br>Feels Like: ${feelslike.toFixed(2)}°C`);
                });
            }).catch(error => {
                console.error("Error loading data:", error);
            });
        }

function createMap() {
    // Create base layers
    let street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });

    // Create the baseMaps object 
    let baseMaps = {
        "Street Map": street
    };

    // Add the baseMaps to the map using L.control.layers
    L.control.layers(baseMaps).addTo(map);
}
createMap();