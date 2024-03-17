const { hashPassword, comparePassword } = require("../helpers/authHelper");
const userModal = require("../modals/userModal");
const jwt = require("jsonwebtoken");
const JWT_SECRATE = "secretkeyfortokenbasedauth"

const registerController = async (req, res) => {
      try {
        const {name , email , password , phone , address , answer} = req.body;
        
          // Validation
            if (!name || !email || !password || !phone || !address || !answer) {
        return res.status(400).send({
          success: false,
          message: "All fields are required",
        });
      }


       //Exisisting user------
        const exisistingUser = await userModal.findOne({email : email});
        console.log("exisistingUser",exisistingUser)
        if(exisistingUser){
            return res.status(209).send({
                success : false,
                message : "User Already Exist"
            })
        }

        //Register user
        const hashedPassowrd = await hashPassword(password);
        //save

        const user = await new userModal({name , email , password : hashedPassowrd , phone , address , answer}).save();
        res.status(201).send({
            success : true,
            message : "User Register successfully",
            user
        })


      } catch (error) {
        console.log("Error at authController" , error)
        res.send({
            success : false , 
            message : "Error in Registration",
            error
        })
      }  
}

const loginController = async (req, res) => {
    console.log("req", req)

        try {
            const {email , password} = req.body;
            if(!email || !password){
                return res.status(404).send({
                    success:false,
                    message : 'Inavlid email or password'
                })
            }

        // -----------------check user----------------
        const user = await userModal.findOne({email});
            if(!user){
                return res.status(404).send({
                    success:false,
                    message : 'User is not register'
                })
            }

        const match = await comparePassword(password , user.password)
            if(!match){
                return res.status(200).send({
                    success:false,
                    message:'Invalid Password'
                })
            }


            //token
            const token = await jwt.sign({_id : user._id} , JWT_SECRATE  , {expiresIn:"1h"});

            res.status(200).send({
                success: true,
                message: "Login Successfully",
                user : {
                    name : user.name,
                    email : user.email,
                    phone : user.phone,
                    address : user.address,
                    role : user.role
                },
                token
            })

        } catch (error) {
            console.log("Error at login controller", error);
            res.status(500).send({
                success : false,
                message : "Error in login",
                error
            })
        }
}

//FOrgot password
const forgotPassword = async (req, res) => {

    try {
        
        const {email, answer , newPassword} = req.body;
        if(!email || !answer || !newPassword ){
          return  res.status(400).send({
                success : false,
                message : "All fields are mendetory"
            })
        }

        //check
        const user = await userModal.findOne({email , answer});
        if(!user){
            return res.status(404).send({
                success : false,
                message : "Wrong email or answer"
            })
        }

        const hashed = await hashPassword(newPassword);
        await userModal.findByIdAndUpdate(user._id , {password : hashed})

        res.status(200).send({
            success : true,
            message : "Password updated successfully"
        })


    } catch (error) {
        console.log("Error forgat password");
        res.status(500).send({
            success : false,
            message : "SOmething went wrong",
            error
        })
    }

}

const testController = (req, res) =>{
    console.log("req.idForVarifaction second" ,req.idForVarifaction)
  res.status(200).send({
    message : "Test route"
  })
}


module.exports = {registerController , loginController , testController , forgotPassword} 