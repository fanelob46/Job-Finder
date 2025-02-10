import AsyncHandler from "express-async-handler";
import User from "../models/UserModel.js";
import generateToken from "../utils/generateToken.js";

export const RegisterUser = AsyncHandler(async (req,res) => {
       const { firstname, lastname, password, location, contact, role} = req.body;
       const {email} = req.body

       if( !firstname || !lastname || !email || !password || !location, !contact)
       {
        res.status(400);
        throw new Error("please enter all fields")
       }

       const userExist = await User.findOne({email});
       
       if(userExist){
        res.status(400);
        throw new Error(" User already exist")
       }

       const newUser = await User.create({
         firstname,
         lastname,
         email,
         password,
         location,
         contact,
         role
       });

       if(newUser){
        generateToken(res, newUser._id)
        res.status(201).json({
            success : true,
            data: newUser
        })

       }else {
        res.status(400);
        throw new Error("registration unsuccessfully")
       }
})

export const Login = AsyncHandler( async (req,res) => {
    const {email, password} = req.body;

    
  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id);
    
    res.status(200).json({
      success: true,
      message: "Successfully logged in Welcome!",
      data: user
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
})

export const getUserProfile = AsyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  const { password, ...userWithoutPassword } = user.toObject();

  if (user) {
    res.json({
      success: true,
      message: "user profile info",
      data: userWithoutPassword,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});


export const updateProfile = AsyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.firstname = req.body.firstname || user.firstname;
    user.lastname = req.body.lastname || user.lastname;
    user.email = req.body.email || user.email;
    user.location = req.body.location || user.location;
    user.contact = req.body.contact || user.contact;
    user.role = req.body.role || user.role

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      firstname: updatedUser.firstname,
      lastname: updatedUser.lastname,
      email: updatedUser.email,
      location: updatedUser.location,
      contact: updatedUser.contact,
      role : updatedUser.role
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});


export const logoutUser = async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "Sad to see you go" });
};

export const CheckRole = async (req,res) => {
  const user = User.findById(req.user._id)

  const role = user.role

  if(user){
    res.status(200).json({
       data: role
    })
  }
}
