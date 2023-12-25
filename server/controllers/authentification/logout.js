const userModel = require('../../models/User');

const logout = async (req,res) => {
    const cookies = req.cookies;
    
    if(!cookies.refresh_token) return res.sendStatus(204);

    const refreshtoken = cookies.refresh_token;
    const userCookies = await userModel.findOne({refreshtoken}).exec();

    if(!userCookies) {
        res.clearCookie('refresh_token', {httpOnly : true});
        return res.sendStatus(204);
    }

    userCookies.refreshtoken = null;
    await userCookies.save();

    res.clearCookie('refresh_token',{httpOnly : true});
    res.sendStatus(204);
    console.log('deconnexion reussi');

}

module.exports = logout;