// 1. Mobile Number Limitation 
function limitContact(input) {
    if (input.value.length > 10) {
        input.value = input.value.slice(0, 10); 
    }
}

// 2. Toast Notification Function (Compact White Box)
function showToast(message, type) {
    const container = document.getElementById("toastContainer");
    const toastText = document.getElementById("toastText");
    const toastBox = document.getElementById("regMessage");

    if (!container || !toastText) return;

    toastText.innerText = message;
    
    // Success-na pachai, error-na sivapu border
    toastBox.style.borderLeftColor = (type === "success") ? "#2ecc71" : "#e74c3c";

    container.style.display = "block"; 

    setTimeout(() => {
        container.style.display = "none";
    }, 4000);
}

document.getElementById('inquiryForm').addEventListener('submit', async function(e) {
    e.preventDefault();

    const phoneInput = document.getElementById('inq_phone').value;

    if (phoneInput.length !== 10) {
        showToast("Please enter a valid 10-digit mobile number", "error");
        return;
    }

    const inquiryData = {
        fullName: document.getElementById('inq_name').value,
        email: document.getElementById('inq_email').value,
        phone: phoneInput,
        category: document.getElementById('inq_category').value,
        message: document.getElementById('inq_message').value
    };

    try {
        // --- RENDER URL UPDATED HERE ---
        const response = await fetch('https://car-zone-application.onrender.com/api/contact/send', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(inquiryData)
        });

        if (response.ok) {
            showToast("Message Sent Successfully!", "success");
            this.reset(); 
        } else {
            showToast("Failed to send message. Try again!", "error");
        }
    } catch (error) {
        console.error("Error:", error);
        showToast("Server Error! Check your connection.", "error");
    }
});
// Active nav link highlight
const currentPage = window.location.pathname.split("/").pop();
document.querySelectorAll(".navbar a").forEach(link => {
  if (link.getAttribute("href") === currentPage) {
    link.classList.add("active");
  } else {
    link.classList.remove("active");
  }
});

// Hamburger toggle
const hamburger = document.getElementById("hamburger");
const navbar = document.getElementById("navbar");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("open");
  navbar.classList.toggle("open");
});

// Close menu when a nav link is clicked
navbar.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("open");
    navbar.classList.remove("open");
  });
});

// Close menu when clicking outside
document.addEventListener("click", (e) => {
  if (!hamburger.contains(e.target) && !navbar.contains(e.target)) {
    hamburger.classList.remove("open");
    navbar.classList.remove("open");
  }
});
