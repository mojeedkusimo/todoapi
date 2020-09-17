const express = require('express');
const app = express();
const authRoutes = require('./routes/auth');
const home = require('./routes/index');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dbCon = require('./db_con/db_con');

const port = process.env.PORT || 7000;

mongoose.connect(dbCon, { useUnifiedTopology: true, useNewUrlParser: true}).then(() => {
    console.log('Db connected');
    app.listen(port, () => {
        console.log('server running on port ' + port)
    })
}).catch((error) => {
    console.log(error);
})
mongoose.Promise = global.Promise;

// app.use(express.static('public'));

app.use(bodyParser.json());

app.use('/api',authRoutes);
app.use('/api',home);

app.use((error,req,res,next) => {
    console.log(error.message);
    res.status(422).send({
        error: error.message
    });
    // next();
})

