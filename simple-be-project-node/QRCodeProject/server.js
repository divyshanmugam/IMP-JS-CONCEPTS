import express from 'express';
import qr from 'qr-image';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>QR Code Generator</title>
      <style>
        body { font-family: Arial; max-width: 600px; margin: 50px auto; }
        input { padding: 10px; width: 100%; }
        button { padding: 10px 20px; margin-top: 10px; }
        img { margin-top: 20px; max-width: 400px; }
      </style>
    </head>
    <body>
      <h1>QR Code Generator</h1>
      <form method="POST" action="/generate">
        <input type="text" name="url" placeholder="Enter URL" required>
        <button type="submit">Generate QR Code</button>
      </form>
      <div id="result"></div>
    </body>
    </html>
  `);
});

app.post('/generate', (req, res) => {
  const url = req.body.url;
  if (!url) {
    return res.status(400).send('URL is required');
  }
  
  const qr_svg = qr.image(url, { type: 'png' });
  res.type('png');
  qr_svg.pipe(res);
});

app.listen(PORT, () => {
  console.log(`QR Code Generator running on http://localhost:${PORT}`);
});
