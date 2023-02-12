const express = require('express');
const app = express();
const cors = require('cors');
const PORT = 8080;
const bodyParser = require('body-parser');
const authRouter = require('./routes/auth-router');
const productsRouter = require('./routes/products-router');
const cartRouter = require('./routes/cart-router');
const loggingMiddleware = require('./middleware/logger');

app.use(cors());

app.use(loggingMiddleware);
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.json({ message: 'Welcome!' });
});

app.use('/', authRouter);
app.use('/products', productsRouter);
app.use('/carts', cartRouter);
app.use('/newitems', cartRouter);

app.listen(PORT, () => {
  console.log(`Listening on PORT ${PORT}`);
});
