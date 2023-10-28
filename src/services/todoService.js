const TodoRepository = require("../repositories/todoRepository")

class TodoService {
  static createTodo = async (args) => {
    const { title, description, is_completed } = args
    const payload = {
      title,
      description,
      is_completed,
    }

    return await TodoRepository.create(payload)
  }

  static getTodoId = (id) => {
    return TodoRepository.findByPk(id)
  }

  static getTodos = () => {
    return TodoRepository.findAll()
  }

  static updateTodo = (id, req, args) => {
    const condition = { where: { id } }
    const payload = {
      title: req.body.title || args.title,
      description: req.body.description || args.description,
      is_completed: req.body.isCompleted || args.is_completed,
    }

    return TodoRepository.update({ payload, condition })
  }

  static deleteTodo = (args) => {
    return TodoRepository.destroy(args)
  }
}

module.exports = TodoService
