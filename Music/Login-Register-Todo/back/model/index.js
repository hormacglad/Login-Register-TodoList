const r = require('../config')


module.exports = {
    login: async ({username, password}) => {

        const  result =  await  r.table('users')
                               .filter(r.row('username').eq(username))
                               .filter(r.row('password').eq(password))
                               .run()

        return result;
    },

    register: async (data) => {

        const result =   r.table('users')
                         .filter(r.row('username').eq(data.username))
                         .run()

        return result;
    },
    
    insert: async (data) => {

        const  result =  await r.table('users').insert({
                                username:data.username,
                                password:data.password}).run()

        return result;
    }
}