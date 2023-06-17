

// Listen for changes to the input field
document.getElementById('images1').addEventListener('change', function() {
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
        document.getElementById('preview-images1').appendChild(preview);
        document.getElementById('preview-container1').style.display = 'block';
      });
      // Read the file as a data URL
      reader.readAsDataURL(file);
    }
  });
  // Listen for click on remove images button
  document.getElementById('remove-images1').addEventListener('click', function() {
    // Clear the input field and remove all preview images
    document.getElementById('images1').value = '';
    document.getElementById('preview-images1').innerHTML = '';
    document.getElementById('preview-container1').style.display = 'none';
  });





const editMenu = document.getElementById("menuEdit");

  // Listen for changes to the input field
  document.getElementById('images').addEventListener('change', function() {
  // Get the selected files
  var files1 = this.files1;
  // Loop through the files
  for (var i = 0; i < files1.length; i++) {
    var file1 = files1[i];
    // Validate file type and size
    var fileType1 = file1.type;
    var fileSize1 = file1.size;
    if (!fileType1.includes('image/')) {
      alert('File must be a JPEG, PNG, or GIF image.');
      this.value = '';
      return;
    }
    if (fileSize1 > 5 * 1024 * 1024) {
      alert('File size must be less than 5MB.');
      this.value = '';
      return;
    }
    // Create a new FileReader object
    var reader1 = new FileReader();
    // Listen for when the FileReader is done loading the file
    reader1.addEventListener('load', function() {
      // Create a new image element with the loaded data
      var preview1 = document.createElement('img');
      preview1.src = reader1.result;
      preview1.alt = '';
      preview1.className = 'col-6 col-md-4 col-lg-3 mb-3';
      // Add the image element to the preview container
      document.getElementById('preview-images').appendChild(preview);
      document.getElementById('preview-container').style.display = 'block';
    });
    // Read the file as a data URL
    reader1.readAsDataURL(file);
  }
});
// Listen for click on remove images button
document.getElementById('remove-images').addEventListener('click', function() {
  // Clear the input field and remove all preview images
  document.getElementById('images').value = '';
  document.getElementById('preview-images').innerHTML = '';
  document.getElementById('preview-container').style.display = 'none';
});














  function Sunday() {
    // Get the checkbox
    var checkBox = document.getElementById("inlinedateCheckbox1");
    // Get the output text
    var date = document.getElementById("time1");
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
    var checkBox = document.getElementById("inlinedateCheckbox3");
    // Get the output text
    var date = document.getElementById("time3");
    // If the checkbox is checked, display the output text
    if (checkBox.checked == true){
      date.style.display = "block";
    } else {
      date.style.display = "none";
    }
  }

  function whensday() {
    // Get the checkbox
    var checkBox = document.getElementById("inlinedateCheckbox4");
    // Get the output text
    var date = document.getElementById("time4");
    // If the checkbox is checked, display the output text
    if (checkBox.checked == true){
      date.style.display = "block";
    } else {
      date.style.display = "none";
    }
  }

  function Thursday() {
    // Get the checkbox
    var checkBox = document.getElementById("inlinedateCheckbox5");
    // Get the output text
    var date = document.getElementById("time5");
    // If the checkbox is checked, display the output text
    if (checkBox.checked == true){
      date.style.display = "block";
    } else {
      date.style.display = "none";
    }
  }

  function Friday() {
    // Get the checkbox
    var checkBox = document.getElementById("inlinedateCheckbox6");
    // Get the output text
    var date = document.getElementById("time6");
    // If the checkbox is checked, display the output text
    if (checkBox.checked == true){
      date.style.display = "block";
    } else {
      date.style.display = "none";
    }
  }

  function Satrday() {
    // Get the checkbox
    var checkBox = document.getElementById("inlinedateCheckbox7");
    // Get the output text
    var date = document.getElementById("time7");
    // If the checkbox is checked, display the output text
    if (checkBox.checked == true){
      date.style.display = "block";
    } else {
      date.style.display = "none";
    }
  }







  // Get the popup form
const requestPopup = document.getElementById("manager-popup");

// Get the button that opens the popup form
const openRequestButton = document.querySelectorAll(".open-request-popup");



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