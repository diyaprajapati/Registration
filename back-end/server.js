const express = require('express');
const app = express();
const port = 8000;
const connectDB = require('./db/dbConnection');
const User = require('./db/user');

//middleware for parsing JSON 

app.use(express.json());

//Registration
app.post('/register', async(req, res) => {
    try {
        const {username, password} = req.body;

        console.log(req.body)

        const user = new User({username, password});
        await user.save();
        
        res.status(201).json({message: 'Registration successful'});
    }    
    catch(error) {
        res.status(500).json({error: 'Registration failed'});
    }
})

connectDB();

app.listen(port, () => {
    console.log('Server is listening...');
})  