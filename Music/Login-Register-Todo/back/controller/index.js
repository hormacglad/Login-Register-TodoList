const router = require('express').Router();
const UserModel = require('../model');
const TodoModel = require('../model/to-do-model')


router.post('/login', async (req, res) => {
    const { username, password } = req.body
    const result = await UserModel.login({ username, password });

    try {
        if (result.length > 0) {
            res.json({ Type: 'Success', Message: 'Successfully Loggedin', Payload: result[0] });
        } else {
            res.json({ Type: 'Error', Message: 'Credentials not found!' });
        }
    }
    catch (error) {
        res.json({ Type: 'Error', Message: "Internal Server Error" })
    }




});

router.post('/register', async (req, res) => {
    const { username, password } = req.body
    try {
        const result = await UserModel.register({ username, password });
        if (result.length > 0) {
            res.json({ Type: 'Error', Message: 'Username already exists' });
            alert('Username already exists');
        } else {

            const inserted = await UserModel.insert({ username, password });
            if (inserted) res.json({ Type: 'Success', Payload: result })
        }
    } catch (error) {
        res.json({ Type: 'Error', Message: "Internal Server Error" });
    }

});

router.post('/dashboard', async (req, res) => {
    // const { todo_list, userId } = req.body
    const result = await TodoModel.addList(req.body);

    // try {
    //     if(result.length>0){
    //         res.json({Type:'Success',Message:'Added Successfully'});
    //     }else{
    //         res.json({Type:'Error',Message:'Unable to Add!'});
    //     }
    // } 
    // catch (error) {
    //     res.json({Type:'Error',Message:"Internal Server Error"})
    // }

})

router.get('/viewTodo', async (req, res) => {
    const result = await TodoModel.viewList()
    res.send(result)
})

router.post('/deleteTodo', async (req, res) => {
    const { id } = req.body
    const result = await TodoModel.deleteList(id)
    return res.send(result)
})


// // DELETE A USER
// app.delete('/users/:id',(req,res)=>{
//     rethink.table('users').get(req.params.id).delete().run(connection,(err,result)=>{
//         if (err) res.json({Type:'Error',Message:"Unable to Delete User"});
//         res.json({Type:'Success',Payload:result})
//     })
// })

// UPDATE A USER
router.put('/updateTodo', async (req, res) => {
    // const {id } = req.body
    await TodoModel.updateList(req)
    const result = await TodoModel.viewList()

    res.send(result)
    // rethink.table('users').get(req.params.id).update({ username: req.body.username, password: req.body.password }).run(connection, (err, result) => {
    //     if (err) res.json({ Type: 'Error', Message: "Unable to Update User" });
    //     res.json({ Type: 'Success', Payload: result })
    // })
})

// // CLEARING TABLE USERS
// app.get("/clear", (req, res) => {
//     rethink.table('users').delete().run(connection,(err,result)=>{
//         if(err) res.json({Type:'Error',Message:"Error in Clearing Users Table"});
//         if(result) res.json({Type:'Success',Message:"Users Successfully Table Cleared"});
//     })
// });

// // START LISTENING SERVER 
// app.listen(port, () => {
//     rethink.connect( {host: 'localhost', port: 28015}, function(err, conn) {
//         if (err) throw err;
//        console.log('Connected Rethink DB');
//        console.log(`Example app listening on port ${port}!`);
//        connection = conn;
//     })
//   });

module.exports = router;
