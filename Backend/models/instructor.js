// this is the model for instructor

const mongoose = require('mongoose');

const instructorSchema = new mongoose.Schema({
    name : mongoose.Schema.Types.String,
    username : mongoose.Schema.Types.String,
    password : mongoose.Schema.Types.String
});

module.exports = mongoose.model('Instructor' , instructorSchema);