const { Todo } = require("../models")

class TodoRepository {
  static findAll = () => {
    return Todo.findAll()
  }

  static findByPk = (id) => {
    return Todo.findByPk(id)
  }

  static create = async (args) => {
    return await Todo.create(args)
  }

  static update = (args) => {
    return Todo.update(args.payload, args.condition)
  }

  static destroy = (args) => {
    return args.destroy()
  }
}

module.exports = TodoRepository
