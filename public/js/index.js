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
function closeForm() {
  popup.style.display = "none";
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
document.querySelector(".close").addEventListener("click", closeForm);









//requests side code---------------------------------------------------------------


// Get the popup form
const requestPopup = document.getElementById("request-popup");

// Get the button that opens the popup form
const openRequestButton = document.querySelectorAll(".open-request-popup");

// Get the elements for the tabs
const tabLinks1 = requestPopup.querySelectorAll(".nav-link");
const tabContents1 = requestPopup.querySelectorAll(".tab-pane");


// Function to open the popup form
openRequestButton.forEach(function(openRequestButton) {
    openRequestButton.addEventListener("click", function() {
        requestPopup.style.display = "block";
    });
    });
// Function to close the popup form
function closeForm1() {
  requestPopup.style.display = "none";
}

function cancelRequest() {

        // TODO: handle the request data (e.g. send it to the server and manage state)
        // Add code to accept the booking request here
          alert('request Cancelation Done');

        requestPopup.style.display = "none"; // close the pop-up after accepting the form

}


// Function to switch between tabs
function openTab1(evt1) {
    // Prevent the default action of the link
    evt1.preventDefault();
  
    // Hide all tab contents
    tabContents1.forEach((tab) => {
      tab.classList.remove("active");
    });
  
    // Remove the "active" class from all tab links
    tabLinks1.forEach((link) => {
      link.classList.remove("active");
    });
  
    // Show the current tab content
    const currentTab = requestPopup.querySelector(evt1.currentTarget.getAttribute("href"));
    currentTab.classList.add("active");
  
    // Add the "active" class to the current tab link
    evt1.currentTarget.classList.add("active");
  }
  
  // Add click event listeners to tab links
  tabLinks1.forEach((link) => {
    link.addEventListener("click", openTab1);
  });

// Add click event listener to close button
document.querySelector(".close").addEventListener("click", closeForm1);

// Add click event listener to cancel button
document.querySelector(".cancel").addEventListener("click", cancelRequest);




// function declineRequest() {
//   // Add code to decline the booking request here
//   alert('Booking request declined!');
//   hideForm();
// }

// function markAsPending() {
//   // Add code to mark the booking request as pending here
//   alert('Booking request marked as pending!');
//   hideForm();
// }

// document.getElementById('accept-button').addEventListener('click', acceptRequest);
// document.getElementById('decline-button').addEventListener('click', declineRequest);
// document.getElementById('pending-button').addEventListener('click', markAsPending);




