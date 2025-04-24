// Access the SimpleWebAuthn browser library
const swu = window.SimpleWebAuthnBrowser;

// DOM elements
const statusMessage = document.getElementById('status-message');

/**
 * Display status messages to the user
 */
function showMessage(message, isSuccess = true) {
  statusMessage.textContent = message;
  statusMessage.className = isSuccess ? 'success' : 'error';
  statusMessage.style.display = 'block';
  
  // Hide message after 5 seconds
  setTimeout(() => {
    statusMessage.style.display = 'none';
  }, 5000);
}

/**
 * Register a new user with WebAuthn
 */
async function registerUser() {
  try {
    // Request registration options from server
    const res = await fetch('/register-options', { method: 'POST' });
    const options = await res.json();
    
    // Start the WebAuthn registration process
    const attResp = await swu.startRegistration(options);
    
    // Verify the registration with the server
    const verifyRes = await fetch('/register-verify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(attResp),
    });
    
    const data = await verifyRes.json();
    
    if (data.verified) {
      showMessage('✅ Registration successful!', true);
    } else {
      showMessage('❌ Registration failed', false);
    }
  } catch (error) {
    console.error('Registration error:', error);
    showMessage(`❌ Error: ${error.message || 'Registration failed'}`, false);
  }
}

/**
 * Login an existing user with WebAuthn
 */
async function login() {
  try {
    // Request login options from server
    const res = await fetch('/login-options', { method: 'POST' });
    const options = await res.json();
    
    // Start the WebAuthn authentication process
    const authResp = await swu.startAuthentication(options);
    
    // Verify the login with the server
    const verifyRes = await fetch('/login-verify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(authResp),
    });
    
    const data = await verifyRes.json();
    
    if (data.verified) {
      showMessage('✅ Login successful!', true);
    } else {
      showMessage('❌ Login failed', false);
    }
  } catch (error) {
    console.error('Login error:', error);
    showMessage(`❌ Error: ${error.message || 'Login failed'}`, false);
  }
}