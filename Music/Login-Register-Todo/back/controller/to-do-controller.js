const router = require('express').Router();
const TodoModel = require('../model/to-do-model')


router.post('/addTodo', async (req, res) => {
     const result = await TodoModel.addList(req.body);
     const data = await TodoModel.viewList(req.body.userId)
    res.json({Message:"Successful", data})
});

router.post('/todoList', async (req, res) => {
    const {userId} = req.body
    const result = await TodoModel.viewList(userId)
    res.send(result)
});

router.post('/deleteTodo', async (req, res) => {
    const { id } = req.body
    const result = await TodoModel.deleteList(id)
    return res.send(result)
});

router.put('/updateTodo', async (req, res) => {
    const {userId } = req.body
    await TodoModel.updateList(req.body)
    const result = await TodoModel.viewList(userId)
    res.send(result)
});

module.exports = router;
