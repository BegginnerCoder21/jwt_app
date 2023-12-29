const jwt = require('jsonwebtoken');
const userModel = require('../../models/User');

const refresh = async(req,res) => {
    const cookies = req.cookies;
    
    if(!cookies.refresh_token) return res.sendStatus(401);

    const refreshtoken = cookies.refresh_token;
    const userCookies = await userModel.findOne({refreshtoken}).exec();

    if(!userCookies) {
        return res.sendStatus(403);
    }
    jwt.verify(refreshtoken,process.env.REFRESH_TOKEN_SECRET,(err,decoded) => {

        if(err || userCookies.id !== decoded.id) return res.sendStatus(403);

        const accessToken = jwt.sign(
            {
                id : userCookies.id
            },
            process.env.ACCESS_TOKEN_SECRET,
            {
                expiresIn : '1800s'
            }
        );

        res.json({access_token : accessToken});
    })
    
}

module.exports = refresh;