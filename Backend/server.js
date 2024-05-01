require('dotenv').config();

const port = 4600;

const express = require('express');

const app = express();

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

const cors = require('cors');
app.use(cors());

const mongoose = require('mongoose');

async function main() {
    await mongoose
        .connect(process.env.DATABASE)
        .then(() => {
            console.log("conected to Mongo");
        })
        .catch(() => {
            console.log("something in mongo went wrong");
        });
}

main();


const loginRouter = require('./Routers/loginRouter.js');
const resetAccountRouter = require('./Routers/resetAccountRouter.js');
const pingRouter = require('./Routers/pingRouter.js');



app.use('/login', loginRouter);
app.use('/resetAccount', resetAccountRouter);
app.use('/ping', pingRouter);

app.listen(port, () => {
    console.log(`Server is running on port ${port}...`);
})