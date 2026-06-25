const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');

const userSchema = mongoose.Schema({
name: {
type: String,
required: [true, "Name is required!"],
trim: true,
maxlength: [20, "Name must be 20 characters or less!"]
},
email: {
type: String,
required: [true, "Email is required!"],
unique: true,
lowercase: true,
trim: true,
validate: [validator.isEmail, "Please use a valid email address!"]
},
password: {
type: String,
required: [true, "Password is required!"],
minlength: [6, "Password must be atleast 6 character!"],
select: false //used for hideing password
},
passwordConfirm:{
  type: String,
  required: [true, "Please confirm your password"],
  validate:{
    validator:function(el) {
      return el === this.password;
    },
    message:"Passwords do not match!"
  }
}
},
{
timestamps: true
});

//hashing password
userSchema.pre('save', async function(){
if (!this.isModified('password')){return;}
this.password = await bcrypt.hash(this.password, 10);
this.passwordConfirm = undefined;
})

//compare password while login
userSchema.methods.comparePassword = async function(password){
return await bcrypt.compare(password, this.password)
};

module.exports = mongoose.model('User', userSchema);