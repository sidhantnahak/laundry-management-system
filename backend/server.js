const connectDatabasae = require('./db');
const app = require('./app')


//unhandled uncatch exception
process.on("uncaughtException", (err) => {
    console.log(`Error:${err.message}`)
    console.log(`shutting down the server due to uncaught exception rejection`)
    server.close(() => {
        process.exit(1)
    })
})
connectDatabasae();


const server = app.listen(process.env.PORT_KEY, () => {
    console.log(`the server is running at http://localhost:${process.env.PORT_KEY}`)
})

//unhandled promise Rejection
process.on("unhandledRejection", (err) => {
   
    console.log(`Error:${err.message}`);
    console.log(`shutting down the server due to unhandled promise rejection`)
    server.close(() => {
        process.exit(1)
    })
}) 