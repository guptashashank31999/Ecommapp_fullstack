const jwt = require('jsonwebtoken');
const userModal = require('../modals/userModal');
const JWT_SECRATE = "secretkeyfortokenbasedauth"


const requireSignIn = (req, res , next) =>{
    
    try {
        const decode = jwt.verify(req.headers.authorization , JWT_SECRATE);
        // console.log("decode", decode)
        // console.log("req.user", req.user)
        req.idForVarifaction = decode   
        next();
    } catch (error) {
        console.log("Error in requireSignIn function", error)
    }
}


//Admin access

const isAdmin = async (req, res, next) => {
            try {
                const user = await userModal.findById(req.idForVarifaction._id);
                console.log("user", user)
                if(user.role !== 1){
                    return res.status(401).send({
                        status : false,
                        message : "Unauthorized access"
                    })
                }else{
                    next();
                }

                
            } catch (error) {
                console.log("Error in isAmdin", error)
                res.status(501).send({
                    success : false,
                    error,
                    message : "Error in admin middleware"
                })
            }
}

module.exports = {requireSignIn , isAdmin}