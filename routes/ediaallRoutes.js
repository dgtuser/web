const express = require('express');
const router = express.Router();
const News = require('../models/newsModel');

router.get('/', async (req, res) => {
    try {
        const news = await News.find();
        res.render('edit', { news, session: req.session });
    } catch (err) {
        res.redirect('/allnews');
    }
});

module.exports = router;
