const errorHandler = (err, req, res, next) => {
  console.log(err)
  if (err.name === "ErrNotFound") {
    res.status(404).json({ success: false, message: "Error Not Found" })
  }

  res.status(500).json({ success: false, message: "Internal Server Error" })
}

module.exports = errorHandler
