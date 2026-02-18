import jwt from 'jsonwebtoken';

const protect = (req,res,next)=>{
 
   try{
     let token = req.headers.authorization;
    if(!token || !authHeader.startsWith('Bearer ') ){
        return res.status(401).json({
        success: false,
        message: 'No token provided'
      });
    }
    token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    req.user = {
      id: decoded.id,
      email: decoded.email
    };

   next();
   } catch(err){
    return res.status(401).json({
      success: false,
      message: 'Invalid token'
    });

   }

}

export default protect;