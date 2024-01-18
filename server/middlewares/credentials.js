const allowedOrigins = require('../config/allowed-origins');

const credentials = (req,res,next) => {
    let origin = req.headers.origin;

    if(allowedOrigins.includes(origin)){
        res.header('Access-Control-Allow-Origin',origin);
        res.header('Access-Control-Allow-Credentials', true);
    }else{
        console.log("Non autorié");
    }

    next();
}

module.exports = credentials;