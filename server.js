const express = require('express');
const fs = require('fs');
const app = express();
const PORT = 3000;

app.use(express.static('public'));
app.use(express.json());

app.get('/api/ids', (req, res) => {
  const data = JSON.parse(fs.readFileSync('database.json'));
  res.json(data);
});

app.post('/api/ids', (req, res) => {
  const newID = req.body.id;
  const user = req.body.user;
  let data = JSON.parse(fs.readFileSync('database.json'));

  if (data.includes(newID)) return res.status(400).json({ error: 'ID sudah ada' });

  data.push(newID);
  fs.writeFileSync('database.json', JSON.stringify(data, null, 2));
  console.log(`${user} menambahkan ID: ${newID}`);
  res.json({ success: true });
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
