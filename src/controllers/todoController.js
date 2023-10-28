const TodoService = require("../services/todoService")

class TodoController {
  static createTodo = async (req, res, next) => {
    try {
      await TodoService.createTodo(req.body)

      res
        .status(201)
        .json({ success: true, message: "Todo Created Successfully" })
    } catch (error) {
      next(error)
    }
  }

  static getTodos = async (req, res, next) => {
    try {
      const data = await TodoService.getTodos()
      if (data.length === 0) throw { name: "ErrNotFound" }

      res.status(200).json({ success: true, data })
    } catch (error) {
      next(error)
    }
  }

  static getTodoId = async (req, res, next) => {
    try {
      const data = await TodoService.getTodoId(req.params.id)
      if (!data) throw { name: "ErrNotFound" }

      res.status(200).json({ success: true, data })
    } catch (error) {
      next(error)
    }
  }

  static updateTodo = async (req, res, next) => {
    try {
      const { id } = req.params
      const data = await TodoService.getTodoId(id)
      if (!data) throw { name: "ErrNotFound" }
      await TodoService.updateTodo(id, req, data)

      res
        .status(200)
        .json({ success: true, message: "Todo Updated Successfully" })
    } catch (error) {
      next(error)
    }
  }

  static deleteTodo = async (req, res, next) => {
    try {
      const { id } = req.params
      const data = await TodoService.getTodoId(id)
      if (!data) throw { name: "ErrNotFound" }
      await TodoService.deleteTodo(data)

      res
        .status(200)
        .json({ success: true, message: "Todo Deleted Successfully" })
    } catch (error) {
      next(error)
    }
  }
}

module.exports = TodoController
