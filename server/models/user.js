const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema ({
    fullname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    title: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    task: [
        {
           type: Schema.Types.ObjectId,
           ref:"Task"
        }
    ],
})

const User = mongoose.model("User", userSchema);
module.exports = User;