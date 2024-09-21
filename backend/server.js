const app = require("./app")

const dotenv = require("dotenv");
const connectDatabase = require('./config/database');

// Handling Uncaught Exception
process.on('uncaughtException', (err) => {
    console.log(`Error: ${err.message}`);
    console.log('Shutting down the server due to Uncaught Exception');
    process.exit(1);
})

// Config

dotenv.config({path:"backend/config/config.env"}); // connecting to the config.env file

// Connecting to database
connectDatabase();


const server = app.listen(process.env.PORT, () => {
    console.log(`Server is working on http://localhost:${process.env.PORT}`)
});

// console.log(youtube)// since youtube is not defined, an error will be thrown
// this error is called uncaught type error

// Unhandled Promise Rejection
process.on('unhandledRejection', (err) => {
    console.log(`Error: ${err.message}`);
    console.log('Shutting down the server due to unhandled promise rejection');

    server.close(() => {
        process.exit(1);
    })
})
