require('dotenv').config();
const mongoose = require('mongoose');
const jsonwebtoken = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const express = require('express');
const app = express();
const path = require('path');
const corsOptions = require('./config/cors');
const connectDB = require('./config/databases');
const credentials = require('./middlewares/credentials');
const errorHandler = require('./middlewares/errorHandler');
const router = require('./routes/route');
const errorNotFound = require('./controllers/error/errorNotFound');
const PORT = 2100;

app.use(express.urlencoded({extended : true}));
app.use(express.json());

//connexion database
connectDB();

//allowed credentials
app.use(credentials); 

//middleware pour les authorisation cors
app.use(cors(corsOptions));

//middelware pour cookie-parser
app.use(cookieParser());

//permission pour les elements static
app.use('static',express.static(path.join(__dirname,'public')));

//Default error handler
app.use(errorHandler);

//Router 
app.use('/api/auth',router);

//erreur lorsqu'aucun chemin de sera trouvé
app.all('*',errorNotFound);

//ce code nous garantira que l'application sera ouvert
//uniquement lorsque la connexion à la base de donné sera
//effectuée avec succès
mongoose.connection.once('open',() => {
    console.log('connexion à la base de donnée reussi');
    app.listen(PORT, () => console.log('le server ecoute sur le port 2100'));
});


