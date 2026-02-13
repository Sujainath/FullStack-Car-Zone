const container = document.querySelector('.container');
const registerBtn = document.querySelector('.register-btn');
const loginBtn = document.querySelector('.login-btn');

// --- 1. UI Toggle Logic ---
registerBtn.addEventListener('click', () => {
    container.classList.add('active');
});

loginBtn.addEventListener('click', () => {
    container.classList.remove('active');
});

// --- 2. TOAST NOTIFICATION LOGIC (Unique White Box) ---
function showToast(message, type) {
    const toastContainer = document.getElementById("toastContainer");
    const toastText = document.getElementById("toastText");
    const toastBox = document.getElementById("regMessage");

    // Message and Style (success/error) set pannuvom
    toastText.innerText = message;
    toastBox.className = "toast-box toast-" + type;

    // Toast box-ah mela irundhu keela vara vaippom
    toastContainer.classList.add("show");

    // 3 seconds appram thirumba mela poyidum
    setTimeout(() => {
        toastContainer.classList.remove("show");
    }, 3000);
}

// --- 3. LOGIN LOGIC (Username or Email support) ---
const loginFormBtn = document.getElementById("accountlogin");

loginFormBtn.addEventListener("click", async (event) => {
    event.preventDefault();

    const identifier = document.getElementById("username").value; 
    const password = document.getElementById("password").value;

    if (!identifier || !password) {
        showToast("Please fill all fields!", "warning");
        return;
    }

    try {
        const response = await fetch('http://localhost:8080/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: identifier, password: password })
        });

        if (response.ok) {
            const user = await response.json();
            sessionStorage.setItem("userToken", user.token); 
            sessionStorage.setItem("userName", user.username);
            
            showToast("Login Successful! Redirecting...", "success");
            
            setTimeout(() => {
                window.location.href = "home.html";
            }, 1500);
        } else {
            showToast("Invalid Username/Email or Password!", "error");
        }
    } catch (error) {
        console.error("Error:", error);
        showToast("Server Error! Backend connect aagala.", "error");
    }
});

// --- 4. REGISTER LOGIC ---
const registerFormBtn = document.getElementById("registeruser");

registerFormBtn.addEventListener("click", async (event) => {
    event.preventDefault();

    const username = document.getElementById("newuser").value;
    const email = document.getElementById("newemail").value;
    const password = document.getElementById("newpassword").value;

    if (!username || !email || !password) {
        showToast("Please fill all fields!", "warning");
        return;
    }

    try {
        const response = await fetch('http://localhost:8080/api/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, email, password })
        });

        if (response.ok) {
            showToast("Registered Successfully!", "success");

            setTimeout(() => {
                container.classList.remove('active');
                
                // Form fields-ah clear panna
                document.getElementById("newuser").value = "";
                document.getElementById("newemail").value = "";
                document.getElementById("newpassword").value = "";
            }, 2000);
        } else {
            showToast("Registration Failed! Try again.", "error");
        }
    } catch (error) {
        console.error("Error:", error);
        showToast("Server Error! Connection failed.", "error");
    }
});