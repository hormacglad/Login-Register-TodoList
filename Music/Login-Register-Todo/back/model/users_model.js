const r = require('../config')


module.exports = {
    login: async ({login_email, login_password}) => {

        const  result =  await  r.table('users')
                               .filter(r.row('email').eq(login_email))
                            //    .filter(r.row('password').eq(login_password))
                               .run()

        return result;
    },

    register: async (data) => {

        const result =   r.table('users')
                         .filter(r.row('username').eq(data.registerEmail))
                         .run()

        return result;
    },
    
    insert: async (data) => {

        const  result =  await r.table('users').insert({
                                email:data.registerEmail,
                                password:data.registerPassword}).run()

        return result;
    }
}