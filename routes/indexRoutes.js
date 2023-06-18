const express = require('express');
const router = express.Router();
const News = require('../models/newsModel');

router.get('/', async (req, res) => {
  try {
    const news = await News.find({});
    console.log(news); 
    res.render('index', { news, session: req.session });
  } catch (err) {
    res.redirect('/');
  }
});


router.get('/news/:postId', async (req, res) => {
  const { postId } = req.params;
  try {
    const item = await News.findOne({ postId });
    res.render('news', { item, session: req.session });
  } catch (err) {
    res.redirect('/');
  }
});

module.exports = router;
