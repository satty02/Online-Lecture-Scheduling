
const express = require('express');
const router = express.Router();
const Course = require('../models/Course');
const admins = require('../models/admin');

// credential for admin 
const admin = [{
        name: 'satish',
        username: "Satish@gmail.com",
        password: "Satish@123"
    }, 
  ];


  router.post('/admin/signup',async (req,res)=>{
    const {name,username,password} = req.body;

    console.log(name, username, password)
    if(!username ||  !password){
        return res.status(400).json({msg: "please enter all the fields"})
    }

    const addAdmin = new admins({name,username,password});
    const saveAdmin = await addAdmin.save();
    res.json(saveAdmin);

  })

//   route to validate the credentials
router.post('/admin/login', (req, res) => {
    const {username, password} = req.body;
    if (!username || !password) {
        return res.status(400).json({message: 'Username and password are required'});
    }

    // Find an instructor with the provided username and password
    const checkAdmin = admin.find((instructor) => instructor.username === username && instructor.password === password);
    
    if (checkAdmin) { // If an instructor is found, respond with a success message or instructor details
        return res.status(200).json({
            message: 'Login successful',
            instructor: {
                name: checkAdmin.name,
                username: checkAdmin.username
            }
        });
    } else { // If no instructor is found, respond with an error message
        return res.status(401).json({message: 'Invalid username or password'});
    }
})

// Route to add new course
router.post('/admin/add-course', async (req, res) => {
    const {name, level, description, image} = req.body;

    if (!name || !level || !description) {
        return res.status(400).json({message: 'Name,level and description are required'});
    }

    try {
        const newCourse = new Course({name, level, description, image});
        const savedCourse = await newCourse.save();
        res.json(savedCourse);
    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'Internal server error'})
    }

});

// Route to assign a lecture to an instructor on particular date;
router.post('/admin/assign-lecture', async (req, res) => {
    const {course_id, instructor, date} = req.body;
    if (!course_id || !instructor || !date) {
        return res.status(400).json({message: `instructor and date both are required`});
    }
    try {
        const allLectures = await Course.find({});
        const searchDate = date;
        const searchInstructor = instructor;

        const foundLectures = [];


        for (const course of allLectures) { // Iterate through the lectures array of each course
            let lect = course.lectures ? course.lectures : [];
            for (const lecture of lect) { // Check if the lecture matches the search criteria
                if (lecture.date === searchDate && lecture.instructor === searchInstructor) {
                    foundLectures.push(course.name); // Add the course name to the results
                }
            }
        }

        // checking if instructor is already assigned a lecture on the same date
        const existingLecture = await Course.findOne({
            _id: course_id,
            lectures: {
                $elemMatch: {
                    date
                }
            }
        });
        if (foundLectures.length) {
            return res.status(400).json({message: 'Instructor is already assigned to this date in other course'})

        } else if (existingLecture) {
            return res.status(400).json({message: 'Instructor is already assigned a lecture to this date'})
        }
        // Add lecture to the course
        const updatedCourse = await Course.findByIdAndUpdate(course_id, {
            $push: {
                lectures: {
                    instructor: instructor,
                    date: date
                }
            }
        }, {new: true});
        res.json(updatedCourse);

    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'Internal server error'})
    }

})

// route to get the the all course 
router.get('/admin/get-all-course', async (req, res) => {
    try {
        const allCourse = await Course.find({});
        res.json(allCourse);
    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'Internal server error'})
    }
});

// route to get the course of partcular lecture
router.get('/admin/get-course-instr', async (req, res) => {
    try {
        const allCourse = await Course.find({});
        res.json(allCourse);
    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'Internal server error'})
    }
});

// route to get the specific course by id
router.get('/admin/get-course/:id', async (req, res) => {
    const courseId = req.params.id;
    try { // Find the course by its ID using Mongoose
        const course = await Course.findById(courseId);
        if (! course) { // If no course with the given ID is found, return a 404 status
            return res.status(404).json({message: 'Course not found'});
        }

        // If the course is found, return it as a JSON response
        res.json(course);
    } catch (error) { // Handle any errors that may occur during the database query
        console.error(error);
        res.status(500).json({message: 'Internal Server Error'});
    }
});

// route to delete the course
router.delete('/admin/delete-course', async (req, res) => {
    const {name, level} = req.body;
    try {
        await Course.findOneAndDelete({level: level});
        res.json(`${name} deleted successfully`);
    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'Internal server error'})
    }
});


module.exports = router;
