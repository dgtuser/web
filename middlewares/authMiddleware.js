function requireLogin(res, req, next) {
    if (res.session && req.session.userId) { 
        return next(); 
    } else {
        return res.redirect('/login'); 
    }
}

module.exports = { requireLogin };
