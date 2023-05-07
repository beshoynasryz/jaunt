// Get the popup form
const popup = document.getElementById("branch-popup");

// Get the button that opens the popup form
const openButton = document.querySelector(".open-button");

// Get the elements for the tabs
const tabLinks = popup.querySelectorAll(".nav-link");
const tabContents = popup.querySelectorAll(".tab-pane");

// Function to open the popup form
function openForm() {
  popup.style.display = "block";
}

// Function to close the popup form
function closeForm1() {
  popup.style.display = "none";
}


function cancelRequest() {

    // TODO: handle the request data (e.g. send it to the server and manage state)
    // Add code to accept the booking request here
      alert('request Cancelation Done');

      popup.style.display = "none"; // close the pop-up after accepting the form

}


// Function to switch between tabs
function openTab(evt) {
  // Prevent the default action of the link
  evt.preventDefault();

  // Hide all tab contents
  tabContents.forEach((tab) => {
    tab.classList.remove("active");
  });

  // Remove the "active" class from all tab links
  tabLinks.forEach((link) => {
    link.classList.remove("active");
  });

  // Show the current tab content
  const currentTab = popup.querySelector(evt.currentTarget.getAttribute("href"));
  currentTab.classList.add("active");

  // Add the "active" class to the current tab link
  evt.currentTarget.classList.add("active");
}

// Add click event listeners to tab links
tabLinks.forEach((link) => {
  link.addEventListener("click", openTab);
});

// Add click event listener to open button
openButton.addEventListener("click", openForm);

// Add click event listener to close button
document.querySelector(".close").addEventListener("click", closeForm1);

// Add click event listener to cancel button
document.querySelector(".cancel").addEventListener("click", cancelRequest);






//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
//------------------------------------------------------------------------------


// Get the popup form
const processedPopup = document.getElementById("processed-popup");

// Get the button that opens the popup form
const openProcessedButton = document.querySelector(".open-Processed-button");

// Get the elements for the tabs
const tabLinks1 = processedPopup.querySelectorAll(".nav-link");
const tabContents1 = processedPopup.querySelectorAll(".tab-pane");

// Function to open the popup form
function openForm1() {
    processedPopup.style.display = "block";
}

// Function to close the popup form
function closeForm2() {
    processedPopup.style.display = "none";
}



// Function to switch between tabs
function openTab1(evt) {
  // Prevent the default action of the link
  evt.preventDefault();

  // Hide all tab contents
  tabContents1.forEach((tab) => {
    tab.classList.remove("active");
  });

  // Remove the "active" class from all tab links
  tabLinks1.forEach((link) => {
    link.classList.remove("active");
  });

  // Show the current tab content
  const currentTab1 = processedPopup.querySelector(evt.currentTarget.getAttribute("href"));
  currentTab1.classList.add("active");

  // Add the "active" class to the current tab link
  evt.currentTarget.classList.add("active");
}

// Add click event listeners to tab links
tabLinks1.forEach((link) => {
  link.addEventListener("click", openTab1);
});

// Add click event listener to open button
openProcessedButton.addEventListener("click", openForm1);

// Add click event listener to close button
document.querySelector(".closeProcessed").addEventListener("click", closeForm2);








//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
//------------------------------------------------------------------------------


// Get the popup form
const historyPopup = document.getElementById("history-popup");

// Get the button that opens the popup form
const openHistoryButton = document.querySelector(".open-History-button");

// Get the elements for the tabs
const tabLinks2 = historyPopup.querySelectorAll(".nav-link");
const tabContents2 = historyPopup.querySelectorAll(".tab-pane");

// Function to open the popup form
function openForm2() {
    historyPopup.style.display = "block";
}

// Function to close the popup form
function closeForm3() {
    historyPopup.style.display = "none";
}



// Function to switch between tabs
function openTab2(evt) {
  // Prevent the default action of the link
  evt.preventDefault();

  // Hide all tab contents
  tabContents2.forEach((tab) => {
    tab.classList.remove("active");
  });

  // Remove the "active" class from all tab links
  tabLinks2.forEach((link) => {
    link.classList.remove("active");
  });

  // Show the current tab content
  const currentTab2 = historyPopup.querySelector(evt.currentTarget.getAttribute("href"));
  currentTab2.classList.add("active");

  // Add the "active" class to the current tab link
  evt.currentTarget.classList.add("active");
}

// Add click event listeners to tab links
tabLinks2.forEach((link) => {
  link.addEventListener("click", openTab2);
});

// Add click event listener to open button
openHistoryButton.addEventListener("click", openForm2);

// Add click event listener to close button
document.querySelector(".closeDoneRequest").addEventListener("click", closeForm3);




