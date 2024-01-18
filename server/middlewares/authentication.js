const jwt = require('jsonwebtoken');
const userModel = require('../models/User');


const authentication = async(req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    
    if(authHeader?.startsWith('Bearer')) {
        
        const token = authHeader.split(' ')[1];
        
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async(err, decoded) => {
            if(err){
                console.log('erreur');
                req.user = {};
                return next();
            }
            const user = await userModel.findById(decoded.id).select({password : 0, refreshtoken : 0}).exec();

            if(user){
                req.user = await user.toObject({getters: true});
            }else{
                console.log('vide');
                req.user = {};
            }
            return next();
        });


    }else{
        console.log('pas de Bearer');
        req.user = {}
        return next();
    }
}

module.exports = authentication;