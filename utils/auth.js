const jwt = require('jsonwebtoken');

function auth(req,res, next){
   let token = req.headers.authorization;

   if(token) {
    token = token.split(' ').pop().trim();
   }
   if (!token) {
    return res.status(401).json(
        {message: 'No token  found'}
    );
   }
   try{ 
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.data ; //like username id and emails
    return next();
   } catch (error) {
    return res.status(401).json({message: 'This token is not valid'});
   }

}
module.exports = auth;