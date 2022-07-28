// from data.js Function to import tdata from data.js
const tableData = data;

// get table ref.  
var tbody = d3.select("tbody");

function buildTable(data) {
  //clear data
  tbody.html("");

  // Use the forEach to loop each object, and append row 
   data.forEach((dataRow) => {

    // We need to append the data 
    let row = tbody.append("tr");

    // loop trhou field in dataRow and add value  
    Object.values(dataRow).forEach((val) => {
      let cell = row.append("td");
      cell.text(val);
    });
  });
}

//Challenge Del. 1 - Create a variable to keep track filters as objects in an array, var = []
var filters = [];

// 3 - Updates the filters with this function 
function updateTheFilters() {

    // 4a - Save element that was changed key: let  .select()
    let changedElements = d3.select(this);
    
    // 4b - Save value that was changed    key: let   .property()
    let elementValues = changedElements.property("value");
    console.log(elementValues);
    
    // 4c - Save the id of the filter that was changed  key let  .attr()
    let filterId = changedElements.attr("id");
    console.log(filterId);
    
    // 5 - Write an if-else statement that checks if a value was changed. 
    if (elementValues) {
      filters[filterId]=elementValues;
    }
    else {
      delete filters[filterId];
    } 
    // 6 - Call function to apply filters and recreates table. 
    filterTable();
  }
  
  // 7 - Function to filter table when data is entered. Using user input
  function filterTable() {
  
    // 8 - Set the filtered data to the tableData. key: let   table based on user data 
    let filteredData = tableData;
 
    // 9 - Loop through all of the filters using prev  filter value
    Object.entries(filters).forEach(([key,value])=> {
      filteredData =  filteredData.filter(row => row[key]=== value);
    });  
  
    // 10 - Rebuild table using filtered data  using created variabel
    buildTable(filteredData);    
  }
  
  // Attach an event to listen for changes to each filter , .selectALL().on()
  d3.selectAll("input").on("change",updateTheFilters);
  
  // 2 -  Build the table when the page loads
  buildTable(tableData);