// from data.js
const tableData = data;

// get table references
var tbody = d3.select("tbody");

function buildTable(data) {
  // First, clear out any existing data
  tbody.html("");

  // Next, loop through each object in the data
  // and append a row and cells for each value in the row
  data.forEach((dataRow) => {
    // Append a row to the table body
    let row = tbody.append("tr");

    // Loop through each field in the dataRow and add
    // each value as a table cell (td)
    Object.values(dataRow).forEach((val) => {
      let cell = row.append("td");
      cell.text(val);
    });
  });
}

// 1. Create a variable to keep track of all the filters as an object.
var filters = {};

// 3. Use this function to update the filters. 
function updateFilters() {

  // 4a. Save the element that was changed as a variable.
  let changedelement = d3.select(this);
  console.log(changedelement);
  // 4b. Save the value that was changed as a variable.
  let filterValue = changedelement.property("value");
  console.log(filterValue);
  // 4c. Save the id of the filter that was changed as a variable.
  let filterId = changedelement.attr("id");
  console.log(filterId);

  // 5. If a filter value was entered then add that filterId and value
  // to the filters list. Otherwise, clear that filter from the filters object.
  if (filterValue) {
    filters[filterId] = filterValue;
    console.log(filters[filterId]);
  }
  else {
    filters[filterId] = "";
  }

  // 6. Call function to apply all filters and rebuild the table
  filterTable();

}

// 7. Use this function to filter the table when data is entered.
function filterTable() {

  // 8. Set the filtered data to the tableData.
  var filteredData = tableData;

  // 9. Loop through all of the filters and keep any data that
  // matches the filter values
  for (const myfilter in filters) {
    console.log(filters[myfilter]);
    if (filters[myfilter] && myfilter == "datetime") {
      filteredData = filteredData.filter(row => row.datetime === filters[myfilter]);
    }
    else if (filters[myfilter] && myfilter == "city") {
      filteredData = filteredData.filter(row => row.city === filters[myfilter]);
    }
    else if (filters[myfilter] && myfilter == "state") {
      filteredData = filteredData.filter(row => row.state === filters[myfilter]);
    }
    else if (filters[myfilter] && myfilter == "country") {
      filteredData = filteredData.filter(row => row.country === filters[myfilter]);
    }
    else if (filters[myfilter] && myfilter == "shape") {
      filteredData = filteredData.filter(row => row.shape === filters[myfilter]);
    }
    else {
      console.log("error");
    }


  }

  //}

  // 10. Finally, rebuild the table using the filtered data
  buildTable(filteredData);


}


// 2. Attach an event to listen for changes to each filter
d3.selectAll("#datetime").on("change", updateFilters);
d3.selectAll("#city").on("change", updateFilters);
d3.selectAll("#state").on("change", updateFilters);
d3.selectAll("#country").on("change", updateFilters);
d3.selectAll("#shape").on("change", updateFilters);



// Build the table when the page loads
buildTable(tableData);
