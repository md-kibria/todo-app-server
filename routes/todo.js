const { getTodos, createTodo, deleteTodo } = require('../controllers/todo')

const router = require('express').Router()

router.get('/', getTodos)

router.post('/add', createTodo)

router.delete('/delete/:id', deleteTodo)

module.exports = router