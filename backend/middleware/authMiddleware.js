 const jwt = require('jsonwebtoken');
 const User = require("../model/user");


 // protect middleware
 const protect = async(req, res,next) =>{
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try{
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token,process.env.JWT_SECRET);
            console.log(decoded);
            req.user = await User.findById(decoded.id).select('-password');

            if(!req.user){
                return res.status(401).json({message:"Not authorized, user not found"});
            }

            console.log("Logged in user role:", req.user?.role);
            next();
        }
        catch(error){
            return res.status(401).json({message:"Not authorized, token failed"})
        }
    }

    if(!token){
        res.status(401).json({message:"Not authorized, no token"})
    }
   
};
module.exports = {
    protect,
}
