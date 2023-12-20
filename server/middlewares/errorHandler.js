const errorHandler = (err,req,res) => {
    req.status(500).send(err.message)
}

module.exports = errorHandler;