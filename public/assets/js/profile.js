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







  // Listen for changes to the input field
document.getElementById('logoImage').addEventListener('change', function() {
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
    var preview = document.getElementById('preview1');
    preview.src = reader.result;
    document.getElementById('preview-container1').style.display = 'block';
  });
  // Read the file as a data URL
  reader.readAsDataURL(file);
});
// Listen for click on remove image button
document.getElementById('remove-image1').addEventListener('click', function() {
  // Clear the input field and hide the preview container
  document.getElementById('logoImage').value = '';
  document.getElementById('preview1').src = '';
  document.getElementById('preview-container1').style.display = 'none';
});
