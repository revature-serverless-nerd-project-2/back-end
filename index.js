const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const PORT = 8080;
const bodyParser = require('body-parser');
const authRouter = require('./routes/auth-router');
const productsRouter = require('./routes/products-router');
const loggingMiddleware = require('./middleware/logger');

app.use(cors({ origin: '*' }));

app.use(loggingMiddleware);
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.json({ message: 'Welcome!' });
});

app.use('/', authRouter);
app.use('/products', productsRouter);

app.listen(PORT, () => {
  console.log(`Listening on PORT ${PORT}`);
});
