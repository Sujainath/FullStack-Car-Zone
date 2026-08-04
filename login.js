/* Render cold-start popup */
const _overlay = document.createElement('div');
_overlay.innerHTML = `
<div id="render-popup" style="
  display:none; position:fixed; inset:0;
  background:rgba(0,0,0,0.45);
  z-index:99999;
  align-items:center;
  justify-content:center;">
  <div style="
    background:#fff; border-radius:12px;
    padding:2rem 2.5rem; max-width:340px;
    width:90%; text-align:center;
    border-top:4px solid #2E75B6;
    font-family:sans-serif;">
    <div style="font-size:2rem;margin-bottom:10px">⏳</div>
    <p style="font-weight:700;color:#1A3557;
      font-size:16px;margin:0 0 8px">
      Please wait!
    </p>
    <p style="color:#444;font-size:14px;
      line-height:1.6;margin:0 0 1rem">
      The backend is connecting - this may take
      up to <strong>50 seconds</strong>.
      Thank you for your patience!
    </p>
    <button onclick="
      document.getElementById('render-popup')
      .style.display='none'"
      style="background:#2E75B6;color:#fff;
      border:none;border-radius:6px;
      padding:8px 24px;font-size:14px;
      cursor:pointer;">
      Got it!
    </button>
  </div>
</div>`;
document.body.appendChild(_overlay.firstElementChild);

setTimeout(() => {
  const p = document.getElementById('render-popup');
  p.style.display = 'flex';
}, 3000);

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

    // Message and Style (success/error)
    toastText.innerText = message;
    toastBox.className = "toast-box toast-" + type;

    toastContainer.classList.add("show");

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
        // --- RENDER URL UPDATED HERE ---
        const response = await fetch('https://car-zone-application.onrender.com/api/auth/login', {
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
        showToast("Server Error! Backend is not connect .", "error");
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
