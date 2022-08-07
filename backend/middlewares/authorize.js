const { expressjwt: jwt } = require('express-jwt');

module.exports = authorize;

function authorize(roles = []) {
    // roles param can be a single role string (e.g. 'user') 
    // or an array of roles (e.g. ['admin', 'user'])
    if (typeof roles === 'string') {
        roles = [roles];
    }

    return [
        // authenticate JWT token and attach user to request object (req.user)
        jwt({ secret: `${process.env.JWT_SECRET}`, algorithms: ['HS256'] }),

        // authorize based on user role
        (req, res, next) => {
            console.log(req.user)
            if (roles.length && !roles.includes(req.user.role)) {
                // user's role is not authorized
                return res.status(401).json({ message: 'Unauthorized' });
            }

            // authentication and authorization successful
            next();
        }
    ];
}