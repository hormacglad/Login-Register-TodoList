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
    }

    // register: async (data) => {

    //     const result =   r.table('users')
    //                      .filter(r.row('username').eq(data.username))
    //                      .run()

    //     return result;
    // },
    
    // insert: async (data) => {

    //     const  result =  await r.table('users').insert({
    //                             username:data.username,
    //                             password:data.password}).run()

    //     return result;
    // }
}