const express = require('express');
const app = express();
require('dotenv').config();
require('./db')();
const userRoutes = require('./routes/userRoutes');

app.use(express.json({limit: "10kb"}));

app.use('/users', userRoutes);

app.use((req,res)=>{
res.status(404).json({
success: false,
message: `Route ${req.originalUrl} not found`
})
})

app.use((err,req,res,next)=>{
console.log(err.stack);
const errStatus = err.status || 500;
res.status(errStatus).json({
success: false,
message: err.message || "Server error"
})
})



app.get('/', (req, res) => {
res.send("Welcome to auth page")
});


const PORT = process.env.PORT || 3000;

app.listen(PORT, ()=>{
    console.log(`Server port ${PORT}`)
})