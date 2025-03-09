require('dotenv').config();

const port = 4501;

const express = require('express');

const app = express();

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

const cors = require('cors');
app.use(cors());

const pingRouter = require('./Routers/pingRouter.js');
const latencyRouter = require('./Routers/latencyRouter.js');




app.use('/ping', pingRouter);
app.use('/latency',latencyRouter)



app.listen(port, () => {
    console.log(`Server is running on port ${port}...`);
})
