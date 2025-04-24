# 💻 WebAuthn Simple Demo

This is a simple demo project that implements **passwordless authentication** using **WebAuthn** with `@simplewebauthn` for the backend (Node.js + Express) and plain HTML/JS for the frontend.

> ⚠️ For local development, it's recommended to use **Firefox** to test on `localhost`.

---

## 🌟 Features

- ✅ User registration with biometric/passkey authentication
- ✅ Secure login without passwords
- 💾 In-memory database simulation (easily adaptable to MongoDB, MySQL, etc.)

---

## 📁 Project Structure

webauthn-demo/ 
├── public/ 
│ └── index.html ← front-end UI for registration/login 
├── servidor.js ← Node.js backend server 
├── package.json ← project dependencies

---

## 🚀 How to Run

1. Clone this repo or copy the files:

   ```bash
   git clone https://github.com/your-username/webauthn-simple-demo.git
   cd webauthn-simple-demo
2. Install dependencies:
   ```bash
   npm install

3. Start the server:
   ```bash
   node servidor.js
4. Open Firefox and visit:
   ```bash
   http://localhost:3000

## 🛠️ Requirements
  Node.js ≥ 18.x

  Firefox (for localhost WebAuthn support)

  A device/browser that supports WebAuthn (biometrics, security key, or platform authenticator)

## 💡 Notes
  This is a demo app and does not include full user account management or persistent storage.

  Do not use this in production without proper security hardening.

## 📚 References
  WebAuthn Guide

  SimpleWebAuthn Docs