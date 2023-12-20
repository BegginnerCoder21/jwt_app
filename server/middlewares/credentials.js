const allowedOrigins = require('../config/allowed-origins');

const credentials = (req,res,next) => {
    let origin = req.header.origins;

    if(allowedOrigins.includes(origin)){
        res.header('Access-Control-Allow-Origin',true);
    }

    next();
}

module.exports = credentials;