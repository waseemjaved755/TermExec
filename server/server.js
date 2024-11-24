const express = require('express');
const { WebSocketServer } = require('ws');
const Docker = require('dockerode');
const cors = require('cors');
const fs = require('fs').promises;
const path = require('path');

const app = express();
app.use(express.json());
app.use(cors());

const docker = new Docker();
let clients = [];

docker.pull('python:3.9-slim', (err, stream) => {
  if (err) {
    console.error('Error pulling Python image:', err.message);
  } else {
    docker.modem.followProgress(stream, onFinished, onProgress);

    function onFinished(err) {
      if (err) console.error('Error completing image pull:', err.message);
      else console.log('Python image pulled successfully');
    }

    function onProgress(event) {
      console.log('Pull progress:', event.status);
    }
  }
});

const wss = new WebSocketServer({ host: '0.0.0.0', port: 8082 });

wss.on('connection', (ws, req) => {
  console.log('Client connected to WebSocket');
  clients.push(ws);
  ws.on('message', async (message) => {
    try {
      const { code } = JSON.parse(message);
      if (!code) {
        ws.send(JSON.stringify({ error: 'Python code is required' }));
        return;
      }
      console.log('Received Python code:', code);
      const container = await docker.createContainer({
        Image: 'python:3.9-slim',
        Cmd: ['python3', '-c', code],
        Tty: false,
      });
  
      await container.start();
      await container.wait();
      const logs = await container.logs({
        stdout: true,
        stderr: true,
      });

      const sanitizedOutput = logs
      .toString('utf-8')
      .replace(/[^\x20-\x7E\n]/g, '')
      .trim();
  
      const output = logs.toString('utf-8').trim();
      console.log('Execution output:', output);
  
      ws.send(sanitizedOutput || 'No output');
  
    } catch (error) {
      console.error('Error executing Python code:', error.message);
      ws.send(JSON.stringify({ error: error.message }));
    }
  });
   
  ws.on('close', () => {
    clients = clients.filter((client) => client !== ws);
    console.log('Client disconnected');
  });
});

app.get('/health', (req, res) => {
  res.status(200).send('WebSocket server is running');
});

const PORT = 8081;
app.listen(PORT, () => {
  console.log(`HTTP server running on port ${PORT}`);
});

console.log('WebSocket server running on port 8082');
