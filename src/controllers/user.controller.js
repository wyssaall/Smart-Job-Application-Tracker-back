import User from '../models/user.model.js';
import bcrypt from 'bcrypt';
import generateToken from '../utils/generateJWT.js';


const login = async(req,res)=>{
  const {email,password} = req.body;
  try{
    const user = await User.findOne({email:email});
    if(!user){
        res.status(404).json({message:'user doesnt exist'})
    }
    const passMatch = await bcrypt.compare(password,user.password);
    if(user && passMatch){
        const token = generateToken({email:user.email, id:user._id});
        res.status(200).json({message: 'login success', token, user:{id:user._id, email:user.email, fullname:user.fullname}});
    }

    
  }catch(err){
    res.status(500).json({message:err.message});
  
  }
}

const register =async(req,res)=>{
    const {fullname,email,password} = req.body;
    const userExist = await User.findOne({email:email});
    if(userExist){
        return res.json({message:'user already exist'});
    
    }
    const hashedPass = await bcrypt.hash(password,10);
    const user = new User({fullname,email,password:hashedPass});
     
    let token = generateToken({email:user.email, id:user._id});
    let newUser = new User({fullname,email,password:hashedPass});
    newUser.token = token;
    
    await newUser.save();
    return res.status(201).json({message:'user created', newUser:{fullname:newUser.fullname, email:newUser.email}});
    
  
}

export {login,register};