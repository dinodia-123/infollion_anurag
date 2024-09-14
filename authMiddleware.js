const jwt = require('jsonwebtoken');
const ROLES = require('./roles');

// Middleware to check if a user has the required role
function authorize(allowedRoles) {
    return (req, res, next) => {
        const token = req.header('Authorization')?.split(' ')[1];
        if (!token) return res.status(401).json({ message: 'No token, authorization denied' });

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decoded;

            if (!allowedRoles.includes(req.user.role)) {
                return res.status(403).json({ message: 'Access denied' });
            }

            next();
        } catch (error) {
            res.status(400).json({ message: 'Invalid token' });
        }
    };
}

module.exports = authorize;
