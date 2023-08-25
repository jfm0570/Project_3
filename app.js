

// Map function
function createMap() {
    // Create the tile layer that will be the background of our map.
    let streetmap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });
  
    // Create a baseMaps object to hold the streetmap layer.
    let baseMaps = {
      "Street Map": streetmap
    };
  
    // Create the map object with options.
    let map = L.map("map", {
      center: [37.8, -96],
      zoom: 5,
      layers: [streetmap]
    });

  }

  // Function for the drop down - I left/commented out code that I obtained from an assingment/activity - I was hoping that can be helpful for you 
  function optionChanged(id){
    // let dropdownMenu = d3.select("#selDataset");
    // Assign the value of the dropdown menu option to a letiable
    // let id = dropdownMenu.property("value");
    // create_bar_graph(final_data, id)
    // create_bubble_graph(final_data,id)
    // id_selected = id
    // deleteRows()
    // demographics(data_full,id_selected)
  }

  // Plot to add data for temperature vs month for each city - added random nubers to test if the graph was working
  function Temperature_chart() {
    data = [{
      x: [1, 2, 3, 4, 5],
      y: [1, 2, 4, 8, 16] }];
  
    Plotly.newPlot("Temperature_plot", data);
  }

  // Plot to add data for uv vs month for each city
  function UV_chart() {
    data = [{
      x: [1, 2, 3, 4, 5],
      y: [1, 2, 4, 8, 16] }];
  
    Plotly.newPlot("UV_plot", data);
  }

createMap()
Temperature_chart()
UV_chart()