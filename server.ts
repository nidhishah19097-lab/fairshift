import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Health check endpoint for Google Cloud Run
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    app: 'FairShift — Work Should Be Fair',
    hackathon: 'Prompt Wars 2026 (SRM ACM)',
    timestamp: new Date().toISOString(),
  });
});

// In production, serve the Vite static build from dist
const distPath = path.resolve(__dirname, 'dist');
app.use(express.static(distPath));

// For client-side SPA routing, send index.html for any unhandled routes
app.get('*', (req, res) => {
  res.sendFile(path.resolve(distPath, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`FairShift server running on port ${PORT}`);
});
