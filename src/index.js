require("dotenv").config()
const express = require("express")
const morgan = require("morgan")
const router = require("./routes/todo")
const errorHandler = require("./middlewares/errorHandler")
const app = express()

app.use(morgan("tiny"))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use("/api", router)
app.use(errorHandler)

module.exports = app
