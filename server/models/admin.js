const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const adminSchema = new Schema ({
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
    teammember: [
        {
           type: Schema.Types.ObjectId,
           ref:"User"
        }
    ],
    task: [
        {
           type: Schema.Types.ObjectId,
           ref:"Task"
        }
    ],
})

const Admin = mongoose.model("Admin", adminSchema);
module.exports = Admin;