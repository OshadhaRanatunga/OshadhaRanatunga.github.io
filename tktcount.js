function increaseTicket(ticketType) {
    let ticketCount = parseInt(localStorage.getItem(ticketType)) || 0;
    ticketCount++;
    localStorage.setItem(ticketType, ticketCount.toString());
    document.getElementById(ticketType).value = ticketCount; // Update the count on the page
  }
  
  function decreaseTicket(ticketType) {
    let ticketCount = parseInt(localStorage.getItem(ticketType)) || 0;
    if (ticketCount > 0) {
      ticketCount--;
      localStorage.setItem(ticketType, ticketCount.toString());
      document.getElementById(ticketType).value = ticketCount; // Update the count on the page
    }
  }
  
  function saveTicketCount(ticketType) {
    let ticketCount = parseInt(document.getElementById(ticketType).value);
    if (!isNaN(ticketCount) && ticketCount >= 0) {
      localStorage.setItem(ticketType, ticketCount.toString());
      alert(`Ticket count for ${ticketType} saved to local storage!`);
    } else {
      alert("Invalid ticket count. Please enter a non-negative number.");
    }
  }
  
  let total = 0;
  function viewTotal() {
    const ticketTypes = ['foreignChildTicket', 'foreignAdultTicket', 'localChildTicket', 'localAdultTicket'];
  
    total = 0; // Reset the total before calculating
    for (const ticketType of ticketTypes) {
      let ticketCount = parseInt(localStorage.getItem(ticketType)) || 0;
      total += ticketCount;
    }
  
    alert(`Total Tickets: ${total}`);
  }
  
  document.addEventListener("DOMContentLoaded", function () {
    const ticketTypes = ['foreignChildTicket', 'foreignAdultTicket', 'localChildTicket', 'localAdultTicket'];
  
    for (const ticketType of ticketTypes) {
      const savedTicketCount = parseInt(localStorage.getItem(ticketType)) || 0;
      document.getElementById(ticketType).value = savedTicketCount; // Update the ticket count on the page
    }
  });
  
  function calculateTotal() {
    const startTime = document.getElementById("startTime").value;
    const endTime = document.getElementById("endTime").value;
  
    localStorage.setItem("startTime", startTime);
    localStorage.setItem("endTime", endTime);
  
    const foreignAdultCost = 10;
    const foreignChildCost = 5;
    const localAdultCost = 4;
    const localChildCost = 2;
  
    const foreignAdultPeakCost = 13;
    const foreignChildPeakCost = 8;
    const localAdultPeakCost = 6;
    const localChildPeakCost = 3;
  
    const peakStart1 = new Date("1970-01-01T10:00:00");
    const peakEnd1 = new Date("1970-01-01T11:00:00");
    const peakStart2 = new Date("1970-01-01T17:00:00");
    const peakEnd2 = new Date("1970-01-01T18:00:00");
  
    const selectedStart = new Date("1970-01-01T" + startTime);
    const selectedEnd = new Date("1970-01-01T" + endTime);
  
    let peakTickets = 0;
    if (selectedStart >= peakStart1 && selectedEnd <= peakEnd1) {
      peakTickets = total;
    } else if (selectedStart >= peakStart2 && selectedEnd <= peakEnd2) {
      peakTickets = total;
    } else if (selectedStart < peakStart1 && selectedEnd > peakStart1) {
      peakTickets = total - ((selectedEnd - peakStart1) / 3600000) * total;
    } else if (selectedStart < peakEnd2 && selectedEnd > peakEnd2) {
      peakTickets = total - ((peakEnd2 - selectedStart) / 3600000) * total;
    }
  
    const normalTickets = total - peakTickets;
  
    const totalCost =
      normalTickets * (foreignAdultCost + foreignChildCost + localAdultCost + localChildCost) +
      peakTickets * (foreignAdultPeakCost + foreignChildPeakCost + localAdultPeakCost + localChildPeakCost);
  
    document.getElementById("totalCost").innerText = totalCost;
  }
  
  // Retrieve saved time from local storage on page load
  window.onload = function () {
    const startTime = localStorage.getItem("startTime");
    const endTime = localStorage.getItem("endTime");
    document.getElementById("startTime").value = startTime || "05:00";
    document.getElementById("endTime").value = endTime || "18:00";
  };
  
  // time selector//
   // Function to dynamically populate the end time select options based on the selected start time
   function updateEndTime() {
    const startTimeSelect = document.getElementById("startTime");
    const endTimeSelect = document.getElementById("endTime");

    // Clear previous options
    endTimeSelect.innerHTML = "";

    // Get the selected start time (in hours since midnight)
    const selectedStartTime = parseInt(startTimeSelect.value);

    // Set the minimum value for the end time to one hour after the selected start time
    const minEndTime = selectedStartTime + 1;

    // Set the maximum value for the end time to 5 pm (17 hours since midnight)
    const maxEndTime = 17;

    // Populate the end time options
    for (let i = minEndTime; i <= maxEndTime; i++) {
      const option = document.createElement("option");
      option.value = i;
      option.text = `${i}:00 ${i < 12 ? "am" : "pm"}`;
      endTimeSelect.appendChild(option);
    }

    // Set the end time to the minimum value initially
    endTimeSelect.value = minEndTime;
  }



  function saveTableToLocalStorage(tableData) {
    localStorage.setItem('ticketsTableData', JSON.stringify(tableData));
  }
  
  function getTableFromLocalStorage() {
    const tableDataJSON = localStorage.getItem('ticketsTableData');
    return JSON.parse(tableDataJSON) || [];
  }
  
  function displayTicketsTable() {
    const ticketTypes = ['foreignChildTicket', 'foreignAdultTicket', 'localChildTicket', 'localAdultTicket', 'InfantTicket'];
  
    const table = document.getElementById('ticketsTable');
    table.innerHTML = ''; // Clear the table before populating
  
    const tableData = getTableFromLocalStorage();
  
    for (const ticketType of ticketTypes) {
      const ticketCount = parseInt(localStorage.getItem(ticketType)) || 0;
      const row = table.insertRow();
      const cellType = row.insertCell();
      const cellCount = row.insertCell();
  
      cellType.textContent = ticketType;
      cellCount.textContent = ticketCount;
  
      // Add the data to the tableData array
      tableData.push({ ticketType, ticketCount });
    }
  
    saveTableToLocalStorage(tableData); // Save the table data to local storage
    calculateTotal(); // Update the total cost after populating the table
  }
  
  // ... Other functions ...
  
  // Retrieve saved time from local storage on page load
  window.onload = function () {
    const startTime = localStorage.getItem("startTime");
    const endTime = localStorage.getItem("endTime");
    document.getElementById("startTime").value = startTime || "05:00";
    document.getElementById("endTime").value = endTime || "18:00";
  
    displayTicketsTable(); // Display the table on page load
  };
  
  