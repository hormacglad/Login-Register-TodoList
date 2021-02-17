const r = require('../config')


module.exports = {
    addList: async (data) => {
        const  result =  await r.table('to-do').insert(data).run()
        return result;
    },

    viewList: async () =>{
        const result = await r.table('to-do').coerceTo('array').run()
        return result;
    },

    deleteList: async (id) =>{
        const result =  await  r.table('to-do').get(id).delete().run()
        return result;
    },

    updateList: async (req) =>{
         await r.table("to-do").filter({id: req.body.id}).update({todo_input: req.body.handleinput_update, userId: req.body.userId}).run();
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