const { body, validationResult } = require("express-validator")

const todoValidate = [
  body("title").isString(),
  body("description").isString().optional(),
  body("isCompleted").isBoolean().optional(),
]

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    res.status(400).json({
      success: false,
      message: "Bad Request",
      errors: errors.array(),
    })
  }
  next()
}

module.exports = {
  todoValidate,
  handleValidationErrors,
}
