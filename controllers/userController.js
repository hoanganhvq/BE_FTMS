const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
// const redisClient = require('../config/redis');
 //Register
 const register = async(req, res)=>{
    try{
        const {username, password } = req.body;
        const existingUser = await User.findOne({username: username});
        if(existingUser){
            return res.status(400).json({message: 'Account already exists'});
        }
        //Hash password
        const hashedPassword = await bcrypt.hash(password, 10);
        
        const user = new User({username: username, password: hashedPassword});
        await user.save();
        res.status(201).json({message: "Account created successfully"});
    } catch(error){
        res.status(400).json({message: error.message});
    }
 }


const login = async(req, res)=>{
    try{
        const {username, password} = req.body;
        const user = await User.findOne({username: username});
        //User not found
        if(!user) {
            return res.status(400).json({message: 'User not found'});
        }
        //Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) {
            return res.status(400).json({message: 'Invalid credentials'});
        }

        //Create and sign JWT token
        const token = jwt.sign(
            {id: user._id, role: user.role},
            process.env.JWT_SECRET,
            {expiresIn: '1h'}
        )

        res.json({token});
    } catch(error){
        res.status(400).json({message: error.message});
    }
}

// const logout = async(req, res) =>{
//     try {
//         const authHeader = req.headers.authorization;
        
//         if (!authHeader || !authHeader.startsWith('Bearer ')) {
//           return res.status(401).json({ message: 'Unauthorized - Token missing!' });
//         }
    
//         const token = authHeader.split(' ')[1];
//         const decoded = jwt.decode(token);
    
//         if (!decoded || typeof decoded !== 'object' || !decoded.exp) {
//           return res.status(400).json({ message: 'Invalid token!' });
//         }
    
//         const expiresIn = decoded.exp - Math.floor(Date.now() / 1000); // Tính thời gian còn lại của token
    
//         if (expiresIn > 0) {
//           await redisClient.setEx(token, expiresIn, 'blacklisted'); // Lưu token vào Redis blacklist với TTL
//         }
    
//         res.clearCookie('token');
//         res.status(200).json({ 
//           status: 'success', 
//           message: 'Logged out successfully' 
//         });
    
//       } catch (error) {
//         res.status(500).json({ message: error.message });
//       }
// }
module.exports = {register, login};
