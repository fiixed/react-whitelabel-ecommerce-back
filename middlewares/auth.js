const admin = require('../firebase/index');
const User = require('../models/user');

exports.authCheck = async (req, res, next) => {
    //console.log(req.headers); //token
    try {
        const firebaseUser = await admin
        .auth()
        .verifyIdToken(req.headers.authtoken);
        console.log('FIREBASE USER IN AUTHCHECK', firebaseUser);
        req.user = firebaseUser;
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({
            error: 'Invalid or expired token'
        });
    }
    
};

exports.adminCheck = async (req, res, next) => {
    const { email } = req.user;

    const adminUser = await User.findOne({email}).exec();

    if (adminUser.role !== 'admin') {
        res.staus(403).json({
            err: 'Admin resource.  Access denied',
        })
    } else {
        next();
    }
}