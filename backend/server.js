// import express from "express"
// import cors from "cors"
// // import restaurants from "./api/restaurants.route.js"
//
// const app = express()
//
// app.use(cors())
// app.use(express.json())
//
// app.use("/api/v1/restaurants", restaurants)
// app.use("*", (req, res) => res.status(404).json({ error: "not found"}))
//
// export default app
const express = require('express');
// const morgan = require('morgan')

const app = express();
const port = 9000;

app.use(express.json());

const cors=require("cors");
const corsOptions ={
    origin:'*',
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200,
}

app.use(cors(corsOptions)) // Use this after the variable declaration

// Logging
// app.use(morgan('dev'))

// set up routers
const displayRouter = require('./routes/display');
const dataRouter = require('./routes/data');

app.use('/display', displayRouter);
app.use('/data', dataRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});

module.exports = app;
