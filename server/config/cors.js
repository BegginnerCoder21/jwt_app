const allowedOrigins = require('./allowed-origins');

const corsOptions = {
    origin : (origin, callback) => {
        if(allowedOrigins.includes(origin) || !origin){
            callback(null, true);
        }else{
            callback(new Error('Non authorisé par cors'));
        }
    }
}

module.exports = corsOptions;