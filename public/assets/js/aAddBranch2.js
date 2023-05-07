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