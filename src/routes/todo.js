const express = require("express")
const router = express.Router()
const TodoController = require("../controllers/todoController")
const {
  handleValidationErrors,
  todoValidate,
} = require("../middlewares/expressValidator")

router.post(
  "/todos",
  todoValidate,
  handleValidationErrors,
  TodoController.createTodo
)
router.get("/todos", TodoController.getTodos)
router.get("/todos/:id", TodoController.getTodoId)
router.put(
  "/todos/:id",
  todoValidate,
  handleValidationErrors,
  TodoController.updateTodo
)
router.delete("/todos/:id", TodoController.deleteTodo)

module.exports = router
