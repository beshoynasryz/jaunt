// Listen for changes to the input field
document.getElementById('images').addEventListener('change', function() {
    // Get the selected files
    var files = this.files;
    // Loop through the files
    for (var i = 0; i < files.length; i++) {
      var file = files[i];
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
        // Create a new image element with the loaded data
        var preview = document.createElement('img');
        preview.src = reader.result;
        preview.alt = '';
        preview.className = 'col-6 col-md-4 col-lg-3 mb-3';
        // Add the image element to the preview container
        document.getElementById('preview-images').appendChild(preview);
        document.getElementById('preview-container').style.display = 'block';
      });
      // Read the file as a data URL
      reader.readAsDataURL(file);
    }
  });
  // Listen for click on remove images button
  document.getElementById('remove-images').addEventListener('click', function() {
    // Clear the input field and remove all preview images
    document.getElementById('images').value = '';
    document.getElementById('preview-images').innerHTML = '';
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







// Add click event listener to cancel button
document.querySelector(".cancel").addEventListener("click", closeForm);


// ---------------------------------bne

// Get the popup form
const userPopup = document.getElementById("user-popupp");

// Get the button that opens the popup form
const openUserButton = document.querySelectorAll(".open-user-popupp");


// Function to open the popup form
openUserButton.forEach(function(openUserButton) {
    openUserButton.addEventListener("click", function() {
        userPopup.style.display = "block";
    });
    });
// Function to close the popup form
function closeForm2() {
    userPopup.style.display = "none";
}


// Add click event listener to cancel button
userPopup.querySelector(".cancel").addEventListener("click", closeForm2);







//Branch FeedBacks PopUp---------------------------------------------
//-------------------------------------------------------------------



// Get the popup form
const BranchPopup = document.getElementById("branch-popupp");

// Get the button that opens the popup form
const openBranchButton = document.querySelectorAll(".open-branch-popupp");


// Function to open the popup form
openBranchButton.forEach(function(openBranchButton) {
    openBranchButton.addEventListener("click", function() {
        BranchPopup.style.display = "block";
    });
    });
    console.log(openBranchButton);
// Function to close the popup form
function closeForm1() {
    BranchPopup.style.display = "none";
}


// Add click event listener to cancel button
BranchPopup.querySelector(".cancel").addEventListener("click", closeForm1);








function Sunday() {
  // Get the checkbox
  let checkBox = document.getElementById("inlinedateCheckbox1");
  // Get the output text
  let date = document.getElementById("time1");
  // If the checkbox is checked, display the output text
  if (checkBox.checked == true){
    date.style.display = "block";
  } else {
    date.style.display = "none";
  }
}

function Monday() {
  // Get the checkbox
  let checkBox = document.getElementById("inlinedateCheckbox2");
  // Get the output text
  let date = document.getElementById("time2");
  // If the checkbox is checked, display the output text
  if (checkBox.checked == true){
    date.style.display = "block";
  } else {
    date.style.display = "none";
  }
}

function thuesday() {
  // Get the checkbox
  let checkBox = document.getElementById("inlinedateCheckbox3");
  // Get the output text
  let date = document.getElementById("time3");
  // If the checkbox is checked, display the output text
  if (checkBox.checked == true){
    date.style.display = "block";
  } else {
    date.style.display = "none";
  }
}

function whensday() {
  // Get the checkbox
  let checkBox = document.getElementById("inlinedateCheckbox4");
  // Get the output text
  let date = document.getElementById("time4");
  // If the checkbox is checked, display the output text
  if (checkBox.checked == true){
    date.style.display = "block";
  } else {
    date.style.display = "none";
  }
}

function thursday() {
  // Get the checkbox
  let checkBox = document.getElementById("inlinedateCheckbox5");
  // Get the output text
  let date = document.getElementById("time5");
  // If the checkbox is checked, display the output text
  if (checkBox.checked == true){
    date.style.display = "block";
  } else {
    date.style.display = "none";
  }
}

function Friday() {
  // Get the checkbox
  let checkBox = document.getElementById("inlinedateCheckbox6");
  // Get the output text
  let date = document.getElementById("time6");
  // If the checkbox is checked, display the output text
  if (checkBox.checked == true){
    date.style.display = "block";
  } else {
    date.style.display = "none";
  }
}

function Satrday() {
  // Get the checkbox
  let checkBox = document.getElementById("inlinedateCheckbox7");
  // Get the output text
  let date = document.getElementById("time7");
  // If the checkbox is checked, display the output text
  if (checkBox.checked == true){
    date.style.display = "block";
  } else {
    date.style.display = "none";
  }
}