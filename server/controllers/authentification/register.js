const userModel = require('../../models/User');
const bcrypt = require('bcrypt');

const register = async(req,res) => {
    const {username,email,firstname,lastname,password,password_comfirm} = req.body;

    if(!username || !email || !firstname || !lastname || !password || !password_comfirm){
        return res.status(422).json({'ErrorEmptyField' : 'Aucun champs ne doit être vide !'});
    }
    if(password !== password_comfirm){
        return res.status(422).json({'ErrorPasswordDiff' : 'Les mots de passe ne correspondent pas !'});
    }

    const userExist = await userModel.exists({email}).exec();
    if(userExist){
        return res.status(409).json({'ErrorExistsEmail' : "L'email fourni existe déjà !"});
    }
    try {
        const hashPassword = await bcrypt.hash(password,10);

        userModel.create({username, email, password : hashPassword, firstname, lastname});
        res.status(201).json({'createSuccessfull' : 'Utilisateur crée avec succès'});
    } catch (error) {
        console.log("Erreur d'enregistrement");
        console.log(error);
    }
}

module.exports = register;