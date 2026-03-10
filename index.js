const express = require('express');
const app = express();
app.use(express.json());

const VERIFY_TOKEN = "mitoken123";
const N8N_WEBHOOK_URL = "https://souh.app.n8n.cloud/webhook-test/whatsapp"; // ← tu URL de N8n

app.get('/webhook', (req, res) => {
  if (req.query['hub.verify_token'] === VERIFY_TOKEN) {
    res.send(req.query['hub.challenge']);
  } else {
    res.sendStatus(403);
  }
});

app.post('/webhook', async (req, res) => {
  const body = req.body;
  
  // Reenviar a N8n
  await fetch(N8N_WEBHOOK_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });

  res.sendStatus(200);
});

app.listen(3000, () => console.log('Webhook activo'));
