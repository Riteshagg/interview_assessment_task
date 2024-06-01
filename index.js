require("dotenv").config()
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const error = require("./src/common/errors")
const Lang = require("./src/middlewares/language.middleware")



mongoose.connect(process.env.DB_URL).then(
    () => {
        console.log("Database Connected...")
    },
    (error) => {
        console.log("Database can not connected: " + error)
    }
);


app.use(express.json());

app.use("/api",Lang.languageMiddleware, require("./src/routes/api.routes"))




// Express routes 404 error catch handling
app.use(function(req, res, next) {
    res.status(error.status.NotFound).json({message:'Not Found',status:error.status.NotFound});
});


app.listen(process.env.port || 3000, function () {
    console.log("Ready to go...")
})

