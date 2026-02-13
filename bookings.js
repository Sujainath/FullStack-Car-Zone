// 1. Date Validation - Past dates-ah block panradhu
document.addEventListener("DOMContentLoaded", () => {
    // Current date-ah eduthu YYYY-MM-DD format-ku maathuroam
    const today = new Date().toISOString().split('T')[0];

    const startDateInput = document.getElementById('startDate');
    const returnDateInput = document.getElementById('returnDate');

    if (startDateInput && returnDateInput) {
        // Innaiku date-ku munnadi irukura dates-ah disable panroam
        startDateInput.setAttribute('min', today);
        returnDateInput.setAttribute('min', today);

        // Start Date select panna udane, Return Date-ah minimum 'Start Date'-ku lock panroam
        startDateInput.addEventListener('change', () => {
            returnDateInput.setAttribute('min', startDateInput.value);
        });
    }
});

// 2. Mobile Number Limitation (10 digits only)
function limitContact(input) {
    if (input.value.length > 10) {
        input.value = input.value.slice(0, 10);
    }
}

// 3. Car Models Data Object
const carModelsData = {
    "Premium": ["Tesla Model S", "BMW M5", "Porsche 911", "Range Rover Velar", "Lamborghini Huracan", "Ferrari F8 Tributo", "Toyota Vellfire", "Nissan Altima", "Rolls Royce Phantom", "Volkswagen Golf"],
    "Maruti Suzuki": ["Wagon R", "Swift", "Ignis", "Baleno", "Brezza", "Dzire", "Celerio", "Ciaz", "Ertiga", "Fronx"],
    "Tata": ["Altroz", "Curvv", "Safari", "Tiago", "Tigor", "Nexon", "Harrier", "Punch"],
    "Mahindra": ["Thar", "XUV700", "XUV400", "Scorpio Classic", "Bolero", "Scorpio-N"],
    "Toyota": ["Etios", "Fortuner", "Innova Hycross", "Innova Crysta", "Glanza"],
    "Kia": ["Seltos", "Sonet", "Carens", "EV6"],
    "Hyundai": ["Creta", "Verna", "Exter", "Venue"],
    "Skoda": ["Slavia", "Kushaq", "Superb"],
    "Renault": ["Kwid", "Kiger", "Triber"],
    "Honda": ["City", "Amaze", "Elevate"],
    "Volkswagen": ["Polo", "Virtus", "Taigun"]
};

// 4. Dynamic Dropdown Logic
function updateModels() {
    const categorySelect = document.getElementById('carCategory');
    const modelSelect = document.getElementById('carModel');
    const selectedCompany = categorySelect.value;

    modelSelect.innerHTML = '<option value="">Select Car Model</option>';

    if (selectedCompany && carModelsData[selectedCompany]) {
        carModelsData[selectedCompany].forEach(model => {
            const option = document.createElement('option');
            option.value = model;
            option.textContent = model;
            modelSelect.appendChild(option);
        });
    }
}

// 5. Toast Notification (Compact White Box)
function showToast(message, type) {
    const container = document.getElementById("toastContainer");
    const toastText = document.getElementById("toastText");
    const toastBox = document.getElementById("regMessage");

    if (!container) return;

    toastText.innerText = message;
    // Type can be 'success' or 'error'
    toastBox.style.borderLeftColor = (type === "success") ? "#2ecc71" : "#e74c3c";

    container.style.display = "block";

    setTimeout(() => {
        container.style.display = "none";
    }, 4000);
}

// 6. Form Submission Logic
document.getElementById('carBookingForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const bookingData = {
        fname: document.getElementById('fname').value,
        lname: document.getElementById('lname').value,
        email: document.getElementById('email').value,
        dob: document.getElementById('dob').value,
        contact: document.getElementById('contact').value,
        state: document.getElementById('state').value,
        district: document.getElementById('district').value,
        city: document.getElementById('city').value,
        startDate: document.getElementById('startDate').value,
        returnDate: document.getElementById('returnDate').value,
        carCategory: document.getElementById('carCategory').value,
        carModel: document.getElementById('carModel').value,
        members: document.getElementById('members').value
    };

    if (bookingData.contact.length !== 10) {
        showToast("Please enter a valid 10-digit mobile number", "error");
        return;
    }

    saveBookingData(bookingData)
        .then((message) => {
            showToast(message, "success");

            // 1.5 seconds wait panni form-ah hide panni Success Message-ah kaaturom
            setTimeout(() => {
                document.querySelector('.form-box').style.display = 'none';
                document.querySelector('center > h1').style.display = 'none';
                document.getElementById('successMessage').style.display = 'block';
            }, 1500);
        })
        .catch((error) => {
            showToast("Error: " + error, "error");
        });
});

// 7. Backend Fetch Function
function saveBookingData(data) {
    return new Promise((resolve, reject) => {
        fetch('http://localhost:8080/api/bookings', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
        .then(response => {
            if (response.ok) {
                resolve("Booking Submitted Successfully!");
            } else {
                reject("Server Error. Please try again.");
            }
        })
        .catch(err => {
            reject("Could not connect to Server.");
        });
    });
}