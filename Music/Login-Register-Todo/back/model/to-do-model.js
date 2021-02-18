const r = require('../config')


module.exports = {
    addList: async (data) => {
        const result = await r.table('to-do').insert(data).run()
        return result;
    },

    viewTodoList: async (data) => {
        console.log(data);
        // const result = await r.table('to-do').coerceTo('array').run()
        // const result = await r.table("to-do").filter(r.row("userId").eq(data))
        const result = await r.table("to-do").filter({id: data}).run()
        return result;
    },

    deleteList: async (id) => {
        const result = await r.table('to-do').get(id).delete().run()
        // console.log(result);
        return result;
    },

    viewList: async () => {
        // console.log(data);
        const result = await r.table('to-do').coerceTo('array').run()
        return result;
    },

    updateList: async (data) => {
        // console.log();
        await r.table("to-do").filter({ id: data.id }).update({ todo_input: data.handleinput_update, userId: data.userId }).run();
        //  const result =  await this.viewList();
        //  return result;
    }
    // // UPDATE A USER
    // app.put('/users/:id',(req,res)=>{
    //     rethink.table('users').get(req.params.id).update({username:req.body.username,password:req.body.password}).run(connection,(err,result)=>{
    //         if (err) res.json({Type:'Error',Message:"Unable to Update User"});
    //         res.json({Type:'Success',Payload:result})
    //     })
    // })


}