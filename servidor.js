// servidor.js
const express = require('express');
const cors = require('cors');
const { generateRegistrationOptions, verifyRegistrationResponse, generateAuthenticationOptions, verifyAuthenticationResponse } = require('@simplewebauthn/server');
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('public')); // sirve index.html

let fakeDB = {}; // simulación de base de datos en memoria

// Ruta para generar opciones de registro
app.post('/register-options', (req, res) => {
  const userId = 'usuario1';
  const options = generateRegistrationOptions({
    rpName: 'Demo WebAuthn',
    rpID: 'localhost',
    userID: userId,
    userName: 'usuario1',
    attestationType: 'none',
  });
  fakeDB[userId] = { currentChallenge: options.challenge };
  res.json(options);
});

// Ruta para verificar la respuesta de registro
app.post('/register-verify', async (req, res) => {
  const userId = 'usuario1';
  const expectedChallenge = fakeDB[userId]?.currentChallenge;

  const verification = await verifyRegistrationResponse({
    response: req.body,
    expectedChallenge,
    expectedOrigin: 'http://localhost:3000',
    expectedRPID: 'localhost',
  });

  if (verification.verified) {
    fakeDB[userId].credential = verification.registrationInfo;
  }

  res.json(verification);
});

// Ruta para generar opciones de login
app.post('/login-options', (req, res) => {
  const userId = 'usuario1';
  const credential = fakeDB[userId]?.credential;

  if (!credential) return res.status(400).send('Usuario no registrado');

  const options = generateAuthenticationOptions({
    allowCredentials: [{
      id: credential.credentialID,
      type: 'public-key',
    }],
    userVerification: 'preferred',
  });

  fakeDB[userId].currentChallenge = options.challenge;
  res.json(options);
});

// Ruta para verificar login
app.post('/login-verify', async (req, res) => {
  const userId = 'usuario1';
  const expectedChallenge = fakeDB[userId]?.currentChallenge;
  const credential = fakeDB[userId]?.credential;

  const verification = await verifyAuthenticationResponse({
    response: req.body,
    expectedChallenge,
    expectedOrigin: 'http://localhost:3000',
    expectedRPID: 'localhost',
    authenticator: credential,
  });

  res.json(verification);
});

app.listen(3000, () => {
  console.log('Servidor corriendo en http://localhost:3000');
});
