const jwt = require('jsonwebtoken');
const redisClient = require('../config/redis');
require('dotenv').config();
const auth = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) return res.status(401).json({ message: 'Unauthorized' });
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Invalid Token' });
    }
}

// Middleware kiểm tra token JWT
const authenticateToken = async (req, res, next) => {
    // Lấy token từ header của request
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];
    // Nếu không có token, trả về lỗi 401 (Unauthorized)
    if (!token) return res.status(401).json({ message: 'Access Denied' });
    //Check BlackList
    const isBlacklisted = await redisClient.get(token);
    if (isBlacklisted) {
        return res.status(403).json({ message: 'Token đã bị vô hiệu hóa, vui lòng đăng nhập lại' });
    }

    // Kiểm tra tính hợp lệ của token bằng cách giải mã với secret key
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        // Nếu token không hợp lệ hoặc hết hạn, trả về lỗi 403 (Forbidden)
        if (err) return res.status(403).json({ message: 'Invalid Token' });

        // Lưu thông tin người dùng vào request để các route phía sau có thể sử dụng
        req.user = user;

        // Cho phép request tiếp tục xử lý ở middleware tiếp theo hoặc controller
        next();
    });
};
module.exports = { auth, authenticateToken }; 