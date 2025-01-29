const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = new Schema ({
    topic: {
        type: String,
        required: true,
        unique: true,
    },
    status: {
        type: String,
        required: true,
    },
    priority: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    team: [
        {
           type: Schema.Types.ObjectId,
           ref:"User"
        }
    ],
    comment: [
        {
           type: String
        }
    ],
    date: {
        type: Date,
        default: new Date(),
    },
})

const Task = mongoose.model("Task", taskSchema);
module.exports = Task;