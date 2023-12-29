const jwt = require('jsonwebtoken');
const userModel = require('../../models/User');
const bcrypt = require('bcrypt');

const login = async (req,res) => {
    const {email,password} = req.body;
    if(!email || !password){
        return res.status(422).json({'ErrorEmptyField' : 'Aucun champ ne doit être vide'});
    }
    const emailExists = await userModel.findOne({email}).exec();
    if(!emailExists) return res.status(409).json({'ErrorEmailNotExist' : "Email ou mot de passe incorrect"});

    const match = await bcrypt.compare(password, emailExists.password)
    if(!match) return res.status(409).json({'ErrorPasswordNotMatch' : "Email ou mot de passe incorrect"});

    //permet de generer des tokens signé par notre
    //token secret afin de s'assurer sa fiabilité
    const accessToken = jwt.sign(
        {
            id : emailExists.id
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn : '1800s'
        }
    );

    const refreshToken = jwt.sign(
        {
            id : emailExists.id
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn : '1d'
        }
    );
    
    //stocker le refreshtoken dans le champ
    //refreshtoken se trouvant dans la BD
    emailExists.refreshtoken = refreshToken;
    await emailExists.save();

    //Envoie le refresh_token dans le cookie de la reponse et renvoi le token d'accès 
    res.cookie('refresh_token', refreshToken,{httpOnly : true, maxAge : 24*60*60*1000});
    res.json({access_token : accessToken});
}

module.exports = login;