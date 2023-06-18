// Импорт модуля express, который используется для создания серверных приложений
const express = require('express');

// Создание экземпляра маршрутизатора, который будет обрабатывать маршруты
const router = express.Router();

const News = require('../models/newsModel');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const path = require('path');
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const news = await News.findById(id);
    res.render('editnews', { news, session: req.session });
  } catch (err) {
    res.redirect('/allnews');
  }
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/uploads');
  },
 filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const filename = file.fieldname + '-' + Date.now() + ext;
    cb(null, filename);
  }
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    if (mimetype && extname) {
      return cb(null, true);
    } else {
     cb('Error: Images only!');
    }
  }
});

router.post('/:id', upload.single('poster'), async (req, res) => {
  const { id } = req.params;
  const { title, category, description } = req.body;

  try {
    const news = await News.findById(id);

    if (!news) {
      return res.redirect('/allnews');
    }

    news.title = title;
    news.category = category;
    news.description = description;

    if (req.file) {
     news.poster = req.file.filename;
    }

    await news.save();
    res.redirect(`/allnews`);
  } catch (err) {
    res.redirect('/allnews');
  }
});

module.exports = router;
