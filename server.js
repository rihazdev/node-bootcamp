const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const connectDB = require('./config/db');

//Load env vars
dotenv.config({path: './config/config.env'});

// Route files 
const bootcamps = require('./routes/bootcamps');

// dev logging to console
// const logger = require('./middleware/logger');

const app = express(); 
const PORT = process.env.PORT || 5000;

// Body parser
app.use(express.json());

// MongoDb connection
connectDB();
if(process.env.NODE_ENV  === 'development'){
    app.use(morgan('dev'));
}
 
// Mount routers
app.use('/api/v1/bootcamps', bootcamps);

const server = app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} node on port ${PORT}`));

// handling unhandled promise rejection
process.on('unhandledRejection', (err) => {
    console.error(err);
    server.close(() => process.exit(1));
});