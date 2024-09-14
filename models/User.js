const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// User schema
const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: 'Guest' }  

    
});

// Encrypt the password before saving
UserSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();

    this.password = await bcrypt.hash(this.password, 10);
    
});

module.exports = mongoose.model('User', UserSchema);
