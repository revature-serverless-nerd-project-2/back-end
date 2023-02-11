const express = require('express');
const bodyParser = require('body-parser');
const ordersRouter = require('./ROUTES/orders-routes');
const usersRouter = require('./ROUTES/users-routes');
const cartRouter = require('./ROUTES/cart-routes')


const PORT = 3000;
const app = express();

app.use(bodyParser.json());
app.use(ordersRouter);
app.use(usersRouter);
app.use(cartRouter);




app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`);
    }
) 