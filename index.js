const express = require('express');
const app = express();

const { HOST, PORT } = process.env;

app.use(express.json());

app.get('/', (req, res, next) => {
  res.status(200).send('Server running OK');
});

app.listen(PORT, () => {
  console.log(`App running on http://${HOST}:${PORT}`);
});
