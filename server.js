require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');

// app
const app = express();

// db
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: true,
    useUnifiedTopology: true
})
.then(() => console.log('DB CONNECTED'))
.catch(err => console.log(`DB CONNECTION ERR ${err}`));

// middleware
app.use(morgan('dev'));
app.use(express.json({limit: '2mb'}));
app.use(cors());

// route
app.get('/api', (req, res) => {
    res.json({
        data: 'hey you hit node API update hey hey'
    });
});

// port
const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`Server is running on port ${port}`));

