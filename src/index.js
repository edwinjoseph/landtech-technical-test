const express = require('express');
const db = require('./db');
const company = require('./controllers/company');
const land = require('./controllers/land');
const app = express();
const port = 3000;

app.get('/', (_, res) => {
  res.json({ ok: true });
});


app.get('/ownership/company/:id', async (req, res) => {
  try {
    const data = await company.getCompany(req.params.id, db);
    res.json({ data });
  } catch (err) {
    res.status(404).json({ data: null });
  }
});

app.get('/ownership/company', async (req, res) => {
  const query = {
    limit: 10,
    skip: 0,
    ...req.query,
  };

  try {
    const data = await company.all(query, db);
    res.json({ data });
  } catch (err) {
    res.status(404).json({ data: null });
  }
});

app.get('/ownership/land/:id', async (req, res) => {
  try {
    const data = await land.getLand(req.params.id, db);
    res.json({ data });
  } catch (err) {
    res.status(404).json({ data: null });
  }
});

app.get('/ownership/land', async (req, res) => {
  const query = {
    limit: 10,
    skip: 0,
    ...req.query,
  };

  try {
    const data = await land.all(query, db);
    res.json({ data });
  } catch (err) {
    res.status(404).json({ data: null });
  }
});

app.listen(port, () => {
  console.info(`Express server running on port ${port}`)
});
