// Create web server that handles comments
// Comments are stored in a file called comments.txt
// Comments are added by making a POST request to /comments
// Comments are retrieved by making a GET request to /comments
// Comments are returned as a JSON array

const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const COMMENTS_FILE = 'comments.txt';

app.get('/comments', (req, res) => {
  fs.readFile(COMMENTS_FILE, 'utf8', (err, data) => {
    if (err) {
      res.status(500).send('Error reading comments file');
      return;
    }

    res.json(data.split('\n'));
  });
});

app.post('/comments', (req, res) => {
  const comment = req.body.comment;
  if (!comment) {
    res.status(400).send('Comment is required');
    return;
  }

  fs.appendFile(COMMENTS_FILE, `${comment}\n`, (err) => {
    if (err) {
      res.status(500).send('Error writing comment to file');
      return;
    }

    res.send('Comment added');
  });
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});

// Test with:
// curl -X POST -H "Content-Type: application/json" -d '{"comment":"Hello"}' http://localhost:3000/comments
// curl http://localhost:3000/comments
// curl -X POST -H "Content-Type: application/json" -d '{"comment":"World"}' http://localhost:3000/comments
// curl http://localhost:3000/comments