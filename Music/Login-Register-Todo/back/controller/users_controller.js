const router = require('express').Router();
const UserModel = require('../model/users_model');


router.post('/login', async (req, res) => {
    const { login_email, login_password } = req.body
    const result = await UserModel.login({ login_email });
    // console.log(result[0].password);
    try {
        if (result.length > 0&&result[0].password===login_password) {
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
    const { registerEmail, registerPassword } = req.body
    try {
        const result = await UserModel.register({ registerEmail, registerPassword });   
        if(result[0]!==undefined){
            return res.json({ Type: 'Error', Message: 'Username already exists' });
        }

        const inserted = await UserModel.insert({ registerEmail, registerPassword });  
        if (inserted) res.json({ Type: 'Success', Payload: inserted })
    } catch (error) {
        res.json({ Type: 'Error', Message: "Internal Server Error" });
    }

});

module.exports = router;