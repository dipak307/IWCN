const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const cors = require('cors'); // Import cors package

const app = express();
const port = 5000;

// MySQL Connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1234',
  database: 'cheking'
});

connection.connect(err => {
  if (err) {
    console.error('Error connecting to MySQL: ', err);
    return;
  }
  console.log('Connected to MySQL database');
});

app.use(bodyParser.json());
app.use(cors()); // Enable CORS for all routes

// API endpoints
app.get('/api/notes', (req, res) => {
  connection.query('SELECT * FROM testing', (error, results) => {
    if (error) {
      console.error('Error fetching notes: ', error);
      res.status(500).send('Error fetching notes');
      return;
    }
    res.json(results);
  });
});

app.post('/api/notes', (req, res) => {
    const { text } = req.body;
    connection.query('INSERT INTO testing (text, timestamp) VALUES (?, NOW())', [text], (error, results) => {
      if (error) {
        console.error('Error adding note: ', error);
        res.status(500).send('Error adding note');
        return;
      }
      res.send('Note added successfully');
    });
  });

app.delete('/api/notes/:id', (req, res) => {
  const { id } = req.params;
  connection.query('DELETE FROM testing WHERE id = ?', [id], (error, results) => {
    if (error) {
      console.error('Error deleting note: ', error);
      res.status(500).send('Error deleting note');
      return;
    }
    res.send('Note deleted successfully');
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
