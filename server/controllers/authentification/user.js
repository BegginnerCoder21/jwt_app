
const user = async (req, res) => {
    const user = req.user;
    console.log(req);
    res.status(200).json(user,);
}

module.exports = user;