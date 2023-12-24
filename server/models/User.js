const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username : {
        type : String,
        required : true,
        trim : true
    }, 
    email : {
        type : String,
        required : true,
        trim : true,
        unique : true,
        lowercase : true,
        validate : [
            (v) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v)
        ]
    },
    firstname : {
        type : String,
        required : true,
        trim : true
    }, 
    lastname : {
        type : String,
        required : true,
        trim : true
    }, 
    password : {
        type : String,
        required : true,
        min : 8
    }, 
    refreshtoken : String
    
},
{virtuals : {
    fullName: {
      get() {
        return this.firstname + ' ' + this.lastname;
      }
    }
}}
);

const user = mongoose.model('User',UserSchema);


module.exports = user;