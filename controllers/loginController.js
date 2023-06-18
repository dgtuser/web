const express = require('express'); 
const mongoose = require('mongoose'); 
const app = express(); 
const User = require('../models/users'); 
const bcrypt = require('bcryptjs'); 

async function login(req, res) {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).send('Введите email и пароль');
    }

    const user = await User.findOne({ email });

    const isPasswordCorrect = bcrypt.compareSync(password, user.password);
    if (!isPasswordCorrect) {
        return res.status(400).send('Неверный email или пароль');
    }

    req.session.isAuthenticated = true;
    req.session.user = {
        _id: user._id,
        email: user.email,
        role: user.role
    };
    
    res.redirect('/');
}

module.exports = {
    login
};
