document.addEventListener("DOMContentLoaded", () => {
    const typedText = "Hi, I'm Kanchan"; // Replace with your text
    const h1Element = document.querySelector(".home-text h1");
    let index = 0;

    function typeText() {
        if (index < typedText.length) {
            h1Element.textContent += typedText[index];
            index++;
            setTimeout(typeText, 2); // Adjust typing speed here
        }
    }

    h1Element.textContent = ""; // Clear any pre-existing text
    typeText();
});


let index = 0;

function showSlide() {
    const slides = document.querySelectorAll('.slide');
    const slider = document.getElementById('slider');
    slider.style.transform = `translateX(-${index * 100}%)`;
}

function moveSlide(step) {
    const slides = document.querySelectorAll('.slide');
    index += step;

    // Loop back to the first or last slide
    if (index < 0) {
        index = slides.length - 1;
    } else if (index >= slides.length) {
        index = 0;
    }

    showSlide();
}

// Swipe detection for touch events
let touchStartX = 0;
let touchEndX = 0;

document.getElementById('slider').addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
});

document.getElementById('slider').addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    if (touchStartX - touchEndX > 50) {
        moveSlide(1);  // Swipe Left
    } else if (touchEndX - touchStartX > 50) {
        moveSlide(-1); // Swipe Right
    }
});


document.getElementById("contact-form").addEventListener("submit", async function (event) {
    event.preventDefault(); // Prevent the default form submission

    // Collect form data
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    // Formspree endpoint
    const formspreeURL = "https://formspree.io/f/mlddnzpb"; // Replace {your-form-id} with your Formspree ID

    // Send the data as JSON
    try {
        const response = await fetch(formspreeURL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: name,
                email: email,
                message: message,
            }),
        });

        if (response.ok) {
            alert("Message sent successfully!");
            document.getElementById("contact-form").reset(); // Clear the form
        } else {
            alert("Failed to send message. Please try again.");
        }
    } catch (error) {
        console.error("Error:", error);
        alert("An error occurred while sending the message.");
    }
});
