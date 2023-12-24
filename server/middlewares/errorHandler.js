const errorHandler = async (err, req, res, next) => {
    if (err instanceof TypeError) {
        // Traitement spécifique pour les erreurs de type TypeError
        res.status(500).send('Erreur de type : ' + err.message);
    } else {
        // Gestion d'autres types d'erreurs
        res.status(500).send(err.message);
    }
};

module.exports = errorHandler;