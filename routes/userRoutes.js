const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const userSchema = require('../models/userSchema');
const {generateToken, authMiddeware} = require('../jwt');
const bcrypt = require('bcryptjs');

//get
router.get('/', authMiddeware, asyncHandler(async (req, res) => {
const response = await userSchema.find();
res.status(200).json(response);
}));

router.post('/signup', asyncHandler( async (req, res) => {
const data = req.body;
const response = await new userSchema(data).save();
res.status(201).json({message: "User registered successfully"})
}));


router.post('/login', asyncHandler( async (req, res) => {
const data = req.body;
const user = await userSchema.findOne({email: data.email}).select('+password');

if (!user || !(await user.comparePassword(data.password))) {
return res.status(401).json({message: "Invalid email or password!"})
}
const payload = {
id: user._id,
name: user.name
}
const token = generateToken(payload, );
res.status(201).json({message: "User logged in successfully", token: token, user: payload})
}));


router.put('/:id', asyncHandler(async (req, res) => {
if (req.body.password) {
  if (req.body.password !== req.body.passwordConfirm) {
    return res.status(400).json({ message: "Confirm password not matched!" });
  }
  req.body.password = await bcrypt.hash(req.body.password, 10);
  req.body.passwordConfirm = undefined;
}

const response = await userSchema.findByIdAndUpdate(req.params.id, req.body, {
new: true,
runValidators: true
});
res.status(201).json({message: "Document updated successfully", response:response})
}));

router.delete('/:id', asyncHandler(async (req, res) => {
const { id } = req.params;
const response = await userSchema.findByIdAndDelete(id);
res.status(201).json({message: "Document deleted successfully"})
}));

module.exports = router;