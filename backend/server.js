const express = require('express');
const cors = require('cors');
const fs = require('fs').promises;
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Path to data files
const PORTFOLIO_DB_PATH = path.join(__dirname, 'data', 'portfolio.json');
const MESSAGES_DB_PATH = path.join(__dirname, 'data', 'messages.json');

// Route to get portfolio details
app.get('/api/portfolio', async (req, res) => {
  try {
    const data = await fs.readFile(PORTFOLIO_DB_PATH, 'utf-8');
    res.json(JSON.parse(data));
  } catch (error) {
    console.error('Error reading portfolio database:', error);
    res.status(500).json({ error: 'Failed to retrieve portfolio details' });
  }
});

// Route to handle contact messages
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Name, email, and message are required fields' });
    }

    const newMessage = {
      id: Date.now().toString(),
      name,
      email,
      subject: subject || 'No Subject',
      message,
      timestamp: new Date().toISOString()
    };

    // Load existing messages or initialize empty list
    let messages = [];
    try {
      const messagesData = await fs.readFile(MESSAGES_DB_PATH, 'utf-8');
      messages = JSON.parse(messagesData);
    } catch (err) {
      // File doesn't exist, which is fine, we will create it
    }

    messages.push(newMessage);
    
    // Save to local database file
    await fs.writeFile(MESSAGES_DB_PATH, JSON.stringify(messages, null, 2), 'utf-8');
    console.log(`Saved contact request from ${name} (${email})`);

    // Return success to frontend
    res.status(200).json({ success: true, message: 'Your message has been received and saved!' });
  } catch (error) {
    console.error('Error saving contact message:', error);
    res.status(500).json({ error: 'Failed to save contact message' });
  }
});

// Serve frontend build static files in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/dist')));
  
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
  });
}

// Start Server
app.listen(PORT, () => {
  console.log(`Backend server is running on http://localhost:${PORT}`);
});
