// this is the model for admin
const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    name:mongoose.Schema.Types.String,
    username:mongoose.Schema.Types.String,
    password:mongoose.Schema.Types.String,
    
});

module.exports = mongoose.model('adminSchema',adminSchema);