
const user = async (req, res) => {
    const user = req.user;
    res.status(200).json(user);
    console.log(user);
}

module.exports = user;