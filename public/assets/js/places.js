// Get the button and the form
const button = document.getElementById('show-form-button');
const form = document.getElementById('form-popup');

// Get the steps and the buttons to navigate between them
const steps = document.querySelectorAll('.form-step');
const prevButtons = document.querySelectorAll('[id^="prev-step"]');
const nextButtons = document.querySelectorAll('[id^="next-step"]');
const submitButton = document.getElementById('submit-form');

// Initialize the current step
let currentStep = 1;

// Show the form when the button is clicked
button.addEventListener('click', function() {
  form.style.display = 'block';
  showStep(currentStep);
});

// Hide the form when the user clicks outside of it
form.addEventListener('click', function(event) {
  if (event.target === form) {
    form.style.display = 'none';
    resetForm();
  }
});

// Go to the previous step when the previous button is clicked
prevButtons.forEach(function(button) {
  button.addEventListener('click', function() {
    currentStep--;
    showStep(currentStep);
  });
});

// Go to the next step when the next button is clicked
nextButtons.forEach(function(button) {
  button.addEventListener('click', function() {
    // Validate the input before proceeding
    if (validateStep(currentStep)) {
      currentStep++;
      showStep(currentStep);
    }
  });
});

// Submit the form when the submit button is clicked
submitButton.addEventListener('click', function() {
  // Validate the input before submitting
  if (validateForm()) {
    // TODO: submit the form data
    alert('Form submitted successfully!');
    form.style.display = 'none';
    resetForm();
  }
});

// Show the specified step and hide the others
function showStep(step) {
  steps.forEach(function(stepElement) {
    if (stepElement.id === 'step-' + step) {
      stepElement.style.display = 'block';
    } else {
      stepElement.style.display = 'none';
    }
  });
  updateButtons();
}

// Update the visibility of the previous and next buttons based on the current step
function updateButtons() {
  if (currentStep === 1) {
    prevButtons.forEach(function(button) {
      button.style.display = 'none';
    });
  } else {
    prevButtons.forEach(function(button) {
      button.style.display = 'inline-block';
    });
  }
  if (currentStep === steps.length) {
    nextButtons.forEach(function(button) {
      button.style.display = 'none';
    });
    submitButton.style.display = 'inline-block';
  } else {
    nextButtons.forEach(function(button) {
      button.style.display = 'inline-block';
    });
    submitButton.style.display = 'none';
  }
}

// Reset the form to its initial state
function resetForm() {
  currentStep = 1;
  steps.forEach(function(stepElement) {
    stepElement.querySelector('input').value = '';
  });
  showStep(currentStep);
}

// Validate the input for the current step
function validateStep(step) {
  const input = steps[step - 1].querySelector('input');
  if (input.value.trim() === '') {
    alert('Please enter a value.');
    input.focus();
    return false;
  }
  return true;
}

// Validate the entire form
function validateForm() {
  let isValid = true;
  steps.forEach(function(stepElement, index) {
    if (!validateStep(index + 1)) {
      isValid = false;
    }
  });
  return isValid;
}