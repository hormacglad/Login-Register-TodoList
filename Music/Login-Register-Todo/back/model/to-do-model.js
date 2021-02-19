const r = require('../config')


module.exports = {
    addList: async (data) => {
        const result = await r.table('to-do').insert(data).run()
        return result;
    },

    deleteList: async (id) => {
        const result = await r.table('to-do').get(id).delete().run()
        return result;
    },

    viewList: async (data) => {
        const result = await r.table("to-do").filter(r.row("userId").eq(data))
        return result;
    },

    updateList: async (data) => {

        await r.table("to-do").filter({ id: data.id }).update({ todo_input: data.handleinput_update, userId: data.userId }).run();
    }

}