const jwt = require('jsonwebtoken');

function auth(req,res, next){
   const authHeader = req.headers.authorization; //takes the auth header instead of variables

   if(!authHeader)//middleware stop the response and give it an error.
    {
    return res.status(401).json(
        {message: 'No token  found'}
    );
   }
   const token = authHeader.split(' ')[1]; //for the bearer token in the specific format

   try{ 
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.data ; //like username id and emails
    next();
   } catch (error) {
    return res.status(401).json({message: 'This token is not valid'}); //caught by middleware
   }

}
module.exports = auth;