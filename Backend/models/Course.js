// this is the model for course
const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    name: {
        type: String,
        required : true,
    },
    level: {
        type: String,
        required : true,
    },
    description: {
        type: String,
        required : true,
    },
    image:{
        type:String,
        required:true
    },
    lectures:{
        type: Object
    }
});

module.exports = mongoose.model('Course', courseSchema);