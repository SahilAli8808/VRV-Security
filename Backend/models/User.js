const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');

const UserSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: [true, 'Name is required'], 
    trim: true, 
    minlength: [2, 'Name must be at least 2 characters'], 
    maxlength: [50, 'Name must not exceed 50 characters'] 
  },
  email: { 
    type: String, 
    required: [true, 'Email is required'], 
    unique: true, 
    lowercase: true, 
    validate: [validator.isEmail, 'Invalid email address'] 
  },
  password: { 
    type: String, 
    required: [true, 'Password is required'], 
    minlength: [8, 'Password must be at least 8 characters'], 
    select: false // Exclude password by default when querying
  },
  username: { 
    type: String, 
    unique: true, 
    default: function() { return `user_${this._id}`; },
    trim: true
  },
  role: { 
    type: String, 
    enum: ['Admin', 'User', 'Moderator'], 
    default: 'User' 
  },
  emailVerified: { 
    type: Boolean, 
    default: false 
  },
}, { timestamps: true }); // Add createdAt and updatedAt timestamps

// // Hash password before saving
// UserSchema.pre('save', async function (next) {
//   if (this.isModified('password')) {
//     this.password = await bcrypt.hash(this.password, 12);
//   }
//   next();
// });


// Prevent duplicate username when null
UserSchema.index({ username: 1 }, { unique: true, sparse: true });

module.exports = mongoose.model('User', UserSchema);
