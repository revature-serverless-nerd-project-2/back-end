const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const PORT = 8080;
const bodyParser = require('body-parser');
const ordersRouter = require('./ROUTES/orders-routes')
const authRouter = require('./routes/auth-router');
const productsRouter = require('./routes/products-router');
const cartRouter = require('./routes/cart-router');
const registerRouter = require('./routes/register-router');
const orderHistoryRouter = require('./routes/previous-orders-router');
const loggingMiddleware = require('./middleware/logger');

app.use(cors({ origin: '*' }));

app.use(loggingMiddleware);
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.json({ message: 'Welcome!' });
});

app.use(ordersRouter);
app.use(cartRouter);
app.use('/', authRouter);
app.use('/products', productsRouter);
app.use('/carts', cartRouter);
app.use('/newitems', cartRouter);
app.use('/register', registerRouter);
app.use('/orders', orderHistoryRouter);

app.listen(PORT, () => {
  console.log(`Listening on PORT ${PORT}`);
});