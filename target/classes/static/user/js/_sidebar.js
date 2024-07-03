
    document.addEventListener("DOMContentLoaded", function() {
        var buttons = document.querySelectorAll(".sidebar-button");

        // Retrieve the id of the clicked button from localStorage
        var activeButtonId = localStorage.getItem('activeButtonId');

        // If there is an active button id, apply the background color
        if (activeButtonId) {
            var activeButton = document.getElementById(activeButtonId);
            if (activeButton) {
                activeButton.style.backgroundColor = "#CDE8E5";
            }
        }

        buttons.forEach(function(button) {
            button.addEventListener("click", function() {
                // Reset the background color of all buttons
                buttons.forEach(function(btn) {
                    btn.style.backgroundColor = ""; // Reset to original
                });

                // Change the background color of the clicked button
                button.style.backgroundColor = "#CDE8E5";

                // Store the id of the clicked button in localStorage
                localStorage.setItem('activeButtonId', button.id);
            });
        });
    });

