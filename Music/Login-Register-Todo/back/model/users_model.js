const r = require('../config')


module.exports = {
    login: async (data) => {

        const result = await r.table('users')
                              .filter(r.row('email').eq(data.login_email))
                              .run()
        return result;
    },

    register: async (data) => {

        const result = await r.table('users')
                        .filter(r.row('email').eq(data.registerEmail))
                        .run()
        return result;
    },

    insert: async (data) => {

        const result = await r.table('users')
                              .insert({email: data.registerEmail,password: data.registerPassword})
                              .run()

        return result;
    }
}