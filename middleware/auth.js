const jwt = require("jsonwebtoken");
module.exports = function (req, res, next) {
    const token = req.header("x-auth-token");
    if (!token) return res.status(401).send("token not available");
    try {
        const decoded = jwt.verify(token, "whiz");
        req.user = decoded;
        if (!req.user.isHirer) return res.status(401).send('access denied')
        next();
    } catch (ex) {
        res.status(401).send("please login first");
    }
};