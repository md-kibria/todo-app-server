const Todo = require('../models/Todo')

exports.getTodos = async (req, res) => {
    try {
        const todos = await Todo.find()

        res.status(200).json({
            status: 200,
            msg: 'All todos',
            total: todos.length,
            todos
        })

    } catch (error) {
        res.status(500).json({
            status: 500,
            msg: 'Error occured!',
            error: error.message
        })
    }
}

exports.createTodo = async (req, res) => {

    try {
        const newTodo = new Todo({
            title: req.body.title
        })

        const todo = await newTodo.save()

        res.status(201).json({
            status: 201,
            msg: 'Todo created successfully',
            todo
        })

    } catch (error) {
        res.status(500).json({
            status: 500,
            msg: 'Error occured!',
            error: error.message
        })
    }
}

exports.deleteTodo = async (req, res) => {
    try {
        const todo = await Todo.findByIdAndDelete(req.params.id)

        if(!todo) {
            res.status(404).json({
                status: 404,
                msg: 'Todo is not found for delete'
            })
        } else {
            res.status(200).json({
                status: 200,
                msg: 'Todo deleted successfully',
                todo
            })
        }

    } catch (error) {
        res.status(500).json({
            status: 500,
            msg: 'Error occured!',
            error: error.message
        })
    }
}