require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');
const { readdirSync } = require('fs');

// app
const app = express();

// db
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
    
})
.then(() => console.log('DB CONNECTED'))
.catch(err => console.log(`DB CONNECTION ERR ${err}`));

// middleware
app.use(morgan('dev'));
app.use(express.json({limit: '2mb'}));
app.use(cors());

// routes middleware - autoloading
readdirSync('./routes').map((routeFile) => app.use('/api', require('./routes/' + routeFile)));

// port
const port = process.env.PORT || 8000;

app.listen(port, '127.0.0.1', () => console.log(`Server is running on port ${port}`));

