
const user = async (req, res) => {
    const user = req.user;

    res.status(200).json(user,);
}

module.exports = user;