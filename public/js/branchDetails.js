// Get the popup form
const userPopup = document.getElementById("user-popup");

// Get the button that opens the popup form
const openUserButton = document.querySelectorAll(".open-user-popup");


// Function to open the popup form
openUserButton.forEach(function(openUserButton) {
    openUserButton.addEventListener("click", function() {
        userPopup.style.display = "block";
    });
    });
// Function to close the popup form
function closeForm() {
    userPopup.style.display = "none";
}


// Add click event listener to cancel button
userPopup.querySelector(".cancel").addEventListener("click", closeForm);







//Branch FeedBacks PopUp---------------------------------------------
//-------------------------------------------------------------------



// Get the popup form
const BranchPopup = document.getElementById("branch-popup");

// Get the button that opens the popup form
const openBranchButton = document.querySelectorAll(".open-branch-popup");


// Function to open the popup form
openBranchButton.forEach(function(openBranchButton) {
    openBranchButton.addEventListener("click", function() {
        BranchPopup.style.display = "block";
    });
    });
// Function to close the popup form
function closeForm1() {
    BranchPopup.style.display = "none";
}


// Add click event listener to cancel button
BranchPopup.querySelector(".cancel").addEventListener("click", closeForm1);
