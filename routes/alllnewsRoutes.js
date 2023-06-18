const express = require('express');
const router = express.Router();
const News = require('../models/newsModel');

router.get('/', async (req, res) => {
    try {
        const news = await News.find({}).sort({ createAt: -1 });
        res.render('allnews', { news, session: req.session });
    } catch (err) {
        res.redirect('/');
    }
});
module.exports = router;
// module.exports = router;
