import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true // Removes whitespace from both ends of a string
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true, // Converts email to lowercase
    trim: true,
    match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address.'] // Basic email validation
  },
  password: {
    type: String,
    required: false,
    minlength: 6 // Minimum password length
  },
  cart:{
    type:Object,
    default:{}
  }
});
const User = mongoose.model('User', userSchema);

export default User; // Export the model for use in other files