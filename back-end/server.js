const express = require('express');
const app = express();
const port = 8000;
const connectDB = require('./db/dbConnection');
const User = require('./db/user');
const bodyParser = require('body-parser');
const cors = require('cors');

//middleware for parsing JSON 

// app.use(express.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// enable cors
app.use(cors());

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
        // console.log(error);
    }
})

// login

app.post('/login', async(req, res) => {
    try {
        const {username, password} = req.body;
        const user = await User.findOne({username});

        if(!user) {
            return res.status(401).json({error: 'Invalid username or password'})
        }
        if(user.password !== password) {
            return res.status(401).json({error: 'Invalid username or password'});
        }
        res.status(200).json({message: 'Login Successful'});
    }
    catch(error) {
        res.status(500).json({error: 'Login Failed'});
    }
})


app.listen(port, () => {
    console.log('Server is listening...');
    connectDB();
})  