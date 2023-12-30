const errorNotFound = (req,res) => {
    
    if(req.accepts('json')){
        res.status(404).json({'error' : '404 Page Not Found'});
    }else{
        res.type('text').send('404 Page Not Found');
    }
}

module.exports = errorNotFound;