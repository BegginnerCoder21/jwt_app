

const errorNotFound = (req,res) => {
    res.status(404)
    if(req.accepts('json')){
        res.json({'error' : '404 Page Not Found'});
    }else{
        res.type('text').send('404 Page Not Found');
    }
}

module.exports = errorNotFound;