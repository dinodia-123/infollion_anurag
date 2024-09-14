const jwt = require("jsonwebtoken");
const { Console } = require("winston/lib/winston/transports");
const priorityMap = {
    "Guest":0,
    "User":1,
    "Admin":2
}

exports.isAuthenticatedUser = async(req , res , next)=>{
    console.log(req.cookies);
    let {token} = req.cookies;
    if(!token){
        res.status(401).json({
            success:false,
        });
        return;
    }
    const decodedData = jwt.verify(token , process.env.JWT_SECRET);
   req.user = decodedData;
   console.log(decodedData);
    next();
}

exports.isAuthorizedUser = async(req , res , next)=>{
    const priority = priorityMap[req.user.role];
    if(priority >= priorityMap["User"]){
        next();
    }else{
        res.status(403).json({
            success:false,
        })
    }
}

exports.isAuthorizedAdmin = async(req , res , next)=>{
    const priority = priorityMap[req.user.role];
    if(priority >= priorityMap["Admin"]){
        next();
    }else{
        res.status(403).json({
            success:false,
        })
    }
}