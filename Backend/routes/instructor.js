// in this script instructor data is sent and validated

const express = require('express');
const router = express.Router();

// credential details of instructors
const instructors = [
    {
        name: 'karan',
        username: "Karan@gmail.com",
        password: "Karan@123"
    },
    {
        name: 'jitu',
        username: "Jitu@gmail.com",
        password: "Jitu@123"
    },
    {
        name: 'sneha',
        username: "Sneha@gmail.com",
        password: "Sneha@123"
    },
    {
        name: 'jagdish',
        username: "Jagdish@gmail.com",
        password: "Jagdish@123"
    }, {
        name: 'chetan',
        username: "Chetan@gmail.com",
        password: "Chetan@123"
    },
]


// route for login of instructor
router.post('/instructor/login', (req, res) => {
    const {username, password} = req.body;

    console.log(req.body)
    if (!username || !password) {
        return res.status(400).json({message: 'Username and password are required'});
    }

    // Find an instructor with the provided username and password
    const instructor = instructors.find((instructor) => instructor.username === username && instructor.password === password);

    if (instructor) {
        // If an instructor is found, respond with a success message or instructor details
        return res.status(200).json({
            message: 'Login successful',
            instructor: {
                name: instructor.name,
                username: instructor.username
            }
        });
    } else {
        // If no instructor is found, respond with an error message
        return res.status(401).json({message: 'Invalid username or password'});
    }
})


module.exports = router;
