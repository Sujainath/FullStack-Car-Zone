// 1. Mobile Number Limitation (10 digits only)
function limitContact(input) {
    if (input.value.length > 10) {
        input.value = input.value.slice(0, 10); // 11vathu digit-ah cut pannidum
    }
}

// 2. Toast Notification Function (Compact White Box)
function showToast(message, type) {
    const container = document.getElementById("toastContainer");
    const toastText = document.getElementById("toastText");
    const toastBox = document.getElementById("regMessage");

    if (!container || !toastText) return;

    toastText.innerText = message;
    
    // Type-ku yethapadi border color (Success = Green, Error = Red)
    toastBox.style.borderLeftColor = (type === "success") ? "#2ecc71" : "#e74c3c";

    // Message-ah screen-la kaatta (Ippo idhu 'Contact Our Team' mela theryum)
    container.style.display = "block"; 

    // 4 seconds kalichu automatic-ah hide aagum
    setTimeout(() => {
        container.style.display = "none";
    }, 4000);
}

// 3. Form Submission with Backend Integration
document.getElementById('inquiryForm').addEventListener('submit', async function(e) {
    e.preventDefault();

    const phoneInput = document.getElementById('inq_phone').value;

    // CLIENT-SIDE VALIDATION: 10 digits irukundha-nu check pannuvom
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
        // Backend API-ku data-va anupuroam
        const response = await fetch('http://localhost:8080/api/contact/send', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(inquiryData)
        });

        if (response.ok) {
            // SUCCESS: Message Sent Successfully! nu mela varum
            showToast("Message Sent Successfully!", "success");
            this.reset(); // Form clear aagum
        } else {
            showToast("Failed to send message. Try again!", "error");
        }
    } catch (error) {
        console.error("Error:", error);
        showToast("Server Error! Check your connection.", "error");
    }
});