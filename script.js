// script.js

// 1. Mobile Navigation Toggle
function setupMobileNav() {
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (navToggle && navLinks) {
        // Toggle the 'nav-open' class on the nav-links when the button is clicked
        navToggle.addEventListener('click', () => {
            navLinks.classList.toggle('nav-open');
        });
        
        // Close menu if a link is clicked (useful on mobile)
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('nav-open');
            });
        });
    }
}

// 2. Player Filtering Functionality (on players.html)
function setupPlayerFiltering() {
    const positionSelect = document.getElementById('position-filter');
    const leagueSelect = document.getElementById('league-filter');
    const playerCards = document.querySelectorAll('.player-card');

    // Only proceed if elements exist (i.e., we are on players.html)
    if (positionSelect && leagueSelect && playerCards.length > 0) {
        const filters = [positionSelect, leagueSelect];

        filters.forEach(filter => {
            filter.addEventListener('change', filterPlayers);
        });

        function filterPlayers() {
            const selectedPosition = positionSelect.value;
            const selectedLeague = leagueSelect.value;

            playerCards.forEach(card => {
                // Get the data attributes from the player card
                const cardPosition = card.getAttribute('data-position');
                const cardLeague = card.getAttribute('data-league');

                // Check if the card matches both selected filters
                const positionMatch = selectedPosition === 'All Positions' || selectedPosition === cardPosition;
                const leagueMatch = selectedLeague === 'All Leagues' || selectedLeague === cardLeague;

                if (positionMatch && leagueMatch) {
                    card.style.display = 'block'; // Show player card
                } else {
                    card.style.display = 'none';  // Hide player card
                }
            });
        }
    }
}

// 3. Simple Contact Form Submission Feedback (on contact.html)
function setupContactForm() {
    const form = document.getElementById('contact-form');
    
    if (form) {
        // Create a dedicated container for feedback
        const messageContainer = document.createElement('div');
        messageContainer.id = 'form-feedback';
        form.parentNode.insertBefore(messageContainer, form.nextSibling);

        form.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent default form submission

            const nameInput = form.querySelector('input[name="name"]');
            const emailInput = form.querySelector('input[name="email"]');
            const messageTextarea = form.querySelector('textarea[name="message"]');
            
            // Simple validation check
            if (nameInput.value.trim() && emailInput.value.trim() && messageTextarea.value.trim()) {
                // Display success message
                messageContainer.textContent = `Success! Thank you for your inquiry, ${nameInput.value.trim()}. We will be in touch shortly.`;
                messageContainer.className = 'feedback success';
                
                form.reset(); // Clear form inputs
                setTimeout(() => {
                    messageContainer.textContent = '';
                    messageContainer.className = '';
                }, 7000); // Hide message after 7 seconds
                
            } else {
                // Display error message
                 messageContainer.textContent = 'ERROR: Please fill out all required fields before submitting.';
                 messageContainer.className = 'feedback error';
            }
        });
    }
}

// Initialize all JS functionalities when the page loads
document.addEventListener('DOMContentLoaded', () => {
    setupMobileNav();
    setupPlayerFiltering();
    setupContactForm();
});