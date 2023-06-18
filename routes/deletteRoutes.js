const express = require('express');
const router = express.Router();
const News = require('../models/newsModel');
router.post('/delete/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const news = await News.findByIdAndDelete(id);
        if (!news) {
            return res.redirect('/editall');
        }
        res.redirect('/editall');
    } catch (err) {
        res.redirect('/editall');
    }
});
module.exports = router;
