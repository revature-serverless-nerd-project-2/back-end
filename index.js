const express = require('express');
const app = express();
const PORT = 3000;
const bodyParser = require('body-parser');
const authRouter = require('./routes/auth-router');
const productsRouter = require('./routes/products-router');
const loggingMiddleware = require('./middleware/logger');

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
