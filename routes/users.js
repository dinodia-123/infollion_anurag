const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const authorize = require('../authMiddleware');
const ROLES = require('../roles');
const router = express.Router();


router.get('/hello', (req, res) => {
    res.send('Hello World');
  });




// User registration route
// User registration route
// User registration route
router.post('/register', async (req, res) => {
    const { username, password, role } = req.body;
    try {
        let user = await User.findOne({ username });
        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }
        

        
        user = new User({ username, password: password, role });
        await user.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});



/////
// Update user role
router.patch('/update-role/:username', authorize([ROLES.ADMIN]), async (req, res) => {
    const { username } = req.params;
    const { role } = req.body;

    if (!ROLES[role]) {
        return res.status(400).json({ message: 'Invalid role' });
    }

    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.role = role;
        await user.save();

        res.json({ message: 'User role updated successfully' });
    } catch (error) {
        console.error('Role update error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});





// User login route
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        console.log(user.password);
        console.log(password);
        const test = await bcrypt.compare("panwar","$2a$10$5MLVTq3xWibFgJQddBKDueVqKQsBd0cZ8a/kdARwcE5AcIbNNYWP");
        console.log(test);

        if (!user) {
            console.log('User not found');
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        console.log(isMatch);
        
        if (!isMatch) {
            console.log('Password mismatch');
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign(
            { username: user.username, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );
        const options = {
            expires: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
            httpOnly:true,
        };
        res.status(200).cookie("token",token,options).json({ token });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
