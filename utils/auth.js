const jwt = require('jsonwebtoken');

function auth(req,res, next){
   const authHeader = req.headers.authorization;

   if(!authHeader)//takes the auth header and takes the bearer token specifically {
    return res.status(401).json(
        {message: 'No token  found'}
    );
   }
   const token = authHeader.split(' ')[1];

   try{ 
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.data ; //like username id and emails
    next();
   } catch (error) {
    return res.status(401).json({message: 'This token is not valid'});
   }

}
module.exports = auth;