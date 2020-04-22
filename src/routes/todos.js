const router = require('express').Router();

const { todos } = require('../controllers');

router.get('/todos', todos.getTodos);

router.put('/todos/:id', todos.updateTodo);

router.post('/todos', todos.addTodo);

router.delete('/todos/:id', todos.deleteTodo);

module.exports = router;
