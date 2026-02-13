// --- 1. LOGIN CHECK (Access Control) ---
if (!sessionStorage.getItem("userToken")) {
    window.location.href = "login.html";
}

// --- 2. STATS COUNTER LOGIC ---
const counters = document.querySelectorAll('.count');
let started = false;

function countUp() {
    counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        const speed = 80;
        const update = () => {
            const value = +counter.innerText.replace('+', ''); // Remove + for calculation
            const increment = target / speed;
            if (value < target) {
                counter.innerText = Math.ceil(value + increment);
                setTimeout(update, 20);
            } else {
                counter.innerText = target + "+";
            }
        };
        update();
    });
}

window.addEventListener('scroll', () => {
    const section = document.querySelector('.stats-section');
    if (!section) return; 
    const sectionTop = section.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;
    if (!started && sectionTop < windowHeight - 100) {
        started = true;
        countUp();
    }
});

// --- 3. TOAST NOTIFICATION LOGIC (Unique White Box) ---
function showToast(message, type) {
    const container = document.getElementById("toastContainer");
    const toastText = document.getElementById("toastText");
    const toastBox = document.getElementById("regMessage");

    // Message and Style (success/error) set pannuvom
    toastText.innerText = message;
    toastBox.className = "toast-box toast-" + type;

    // Toast box-ah mela irundhu keela vara vaippom
    container.classList.add("show");

    // 3 seconds appram thirumba mela poyidum
    setTimeout(() => {
        container.classList.remove("show");
    }, 3000);
}

// --- 4. MODAL CONTROL LOGIC ---
function handleLogout() {
    document.getElementById("logoutModal").style.display = "block";
}

function closeModal() {
    document.getElementById("logoutModal").style.display = "none";
}

// --- 5. SECURE DELETE & LOGOUT LOGIC ---
async function confirmDelete() {
    const emailInput = document.getElementById("confirmEmail").value;
    const passwordInput = document.getElementById("confirmPassword").value;

    // Validation Check
    if (!emailInput || !passwordInput) {
        showToast("Please fill all fields!", "warning");
        return;
    }

    try {
        const response = await fetch(`http://localhost:8080/api/auth/delete-account?email=${emailInput}&password=${passwordInput}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            // SUCCESS
            closeModal();
            showToast("Logout Successfully!", "success"); 

            // 2 seconds gap vittu redirect pannuvom
            setTimeout(() => {
                sessionStorage.clear();
                window.location.href = "login.html";
            }, 2000);

        } else {
            // ERROR: Backend invalid credentials-nu sonna
            showToast("Invalid Email or Password!", "error");
        }
    } catch (error) {
        console.error("Error:", error);
        showToast("Server Error! Connection failed.", "error");
    }
}