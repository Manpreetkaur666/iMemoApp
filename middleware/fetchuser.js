// const { getNextKeyDef } = require('@testing-library/user-event/dist/keyboard/getNextKeyDef');
var jwt = require('jsonwebtoken');

const JWT_SECRET = 'IneedsomeC0ff##';

const fetchuser = (req, res, next) => {

    //GET the user from the JWT and add id to req object
    const token = req.header('auth-token');
    if(!token){
        res.status(401).send({error: "Please authenticate using valid Token!"});
    }
    try {
        var data = jwt.verify(token, JWT_SECRET);
        req.user = data.user
        next()
    } catch (error) {
        res.status(401).send({error: "Please authenticate using valid Token!"});
    } 

}

module.exports = fetchuser;