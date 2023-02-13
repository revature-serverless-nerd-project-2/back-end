const express = require('express');
const bodyParser = require('body-parser');
const ordersRouter = require('./ROUTES/orders-routes');

const cors = require('cors');


const PORT = 8080;
const app = express();
app.use(cors({
    origin : 'http://localhost:3001'
}));

app.use(bodyParser.json());
app.use(ordersRouter);


app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`);
    }
) 