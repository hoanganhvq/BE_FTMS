const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
// const redisClient = require('../config/redis');
//Register
const generateToken = (id, email) => {
    return jwt.sign(
        { id: id, email: email },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
    )
}


const register = async (req, res) => {
    try {
        const { email, password, name } = req.body;
        const existingUser = await User.findOne({ email: email });
        if (existingUser) {
            return res.status(400).json({ message: 'Account already exists' });
        }
        //Hash password
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ email: email, password: hashedPassword, name: name });
        await user.save();
        //Generate token
        const token = generateToken(user._id, user.email);

        res.status(201).json(
            {
                token: token,
                status: 'success',
                user: { id: user._id, name: user.name, role: user.role, profilePic: user.profilePic }
            });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}


const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email: email });
        //User not found
        if (!user) {
            return res.status(400).json({ message: 'Email not found' });
        }
        //Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        //Tao token 
        const token = generateToken(user._id, user.email);
        res.json({
            token: token,
            status: 'success',
            user: { id: user._id, name: user.name, role: user.role, profilePic: user.profilePic }
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

const getUser = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
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
module.exports = { register, login, getUser };
