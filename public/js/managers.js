// Listen for changes to the input field
document.getElementById('image').addEventListener('change', function() {
    // Get the selected file
    var file = this.files[0];
    // Validate file type and size
    var fileType = file.type;
    var fileSize = file.size;
    if (!fileType.includes('image/')) {
      alert('File must be a JPEG, PNG, or GIF image.');
      this.value = '';
      return;
    }
    if (fileSize > 5 * 1024 * 1024) {
      alert('File size must be less than 5MB.');
      this.value = '';
      return;
    }
    // Create a new FileReader object
    var reader = new FileReader();
    // Listen for when the FileReader is done loading the file
    reader.addEventListener('load', function() {
      // Set the preview image source to the loaded data and display it
      var preview = document.getElementById('preview');
      preview.src = reader.result;
      document.getElementById('preview-container').style.display = 'block';
    });
    // Read the file as a data URL
    reader.readAsDataURL(file);
  });
  // Listen for click on remove image button
  document.getElementById('remove-image').addEventListener('click', function() {
    // Clear the input field and hide the preview container
    document.getElementById('image').value = '';
    document.getElementById('preview').src = '';
    document.getElementById('preview-container').style.display = 'none';
  });






  //manager pop up------------------------------------------------------------------
  //--------------------------------------------------------------------------------


// Get the popup form
const requestPopup = document.getElementById("manager-popup");

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
function closeForm() {
  requestPopup.style.display = "none";
}

function saveManager() {

        // TODO: handle the request data (e.g. send it to the server and manage state)
        // Add code to accept the booking request here
          // alert('Manager it`s save');

        requestPopup.style.display = "none"; // close the pop-up after accepting the form

}




document.querySelector(".save").addEventListener("click", saveManager);


// Add click event listener to cancel button
document.querySelector(".close").addEventListener("click", closeForm);















  //manager details pop up------------------------------------------------------------------
  //--------------------------------------------------------------------------------



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
document.querySelector(".close1").addEventListener("click", closeForm1);





