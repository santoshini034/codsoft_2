//declaration
require('dotenv').config();
const express = require("express");
const mongoose = require('mongoose');
const app = express();
const cors = require("cors");
const bodyparser = require("body-parser");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const cookie = require('cookie-parser')
const PORT = process.env.PORT || 3000;
const url = process.env.MONGO_URL;

//models
const User = require("./models/user")
const Admin = require("./models/admin")
const Task = require('./models/task')

//connected to db
main().then(() => {
    console.log("app is connected to db");
})
async function main() {
    await mongoose.connect(url);
}


//middleware
app.use(cors());
app.use(bodyparser.json());


const createSecretToken = (id) => {
    return jwt.sign({id}, process.env.TOKEN_KEY,{
        expiresIn: '1h',
    })
}

const verifyuser = async(req, res, next) => {
    const auth = req.body.auth;
    if(!auth){
        return res.json({success: false, message: "Token not found" })
    }
    const token =jwt.verify(auth, process.env.TOKEN_KEY, 
        async(error, data) => {
            if(error){
                console.log(error)
                return res.json({success: false, message: "user not found"})
            }else{
                req.userdata = data.id;
                next();
            }
    })
}

//app listening
app.listen(PORT,() => {
    console.log("App is listerning at port 3000");
})

//signin page
app.post("/signin", async(req,res) => {
    try {
        let {role, ...userdata} = req.body;
        let newuser;
        if(role =="user"){
            newuser = new User(userdata);
        } else{
            newuser = new Admin(userdata);
        }
        newuser.password = await bcrypt.hash(newuser.password, 12);
        await newuser.save();
        const token = createSecretToken(newuser._id);
        res.cookie("token", token, {
            withCredentials: true,
            httpOnly: false,
        });
        res.json({success: true, message: "User Registered", token,role});  
    } catch (error) {
        res.json({success: false, message: "Something went wrong, try again"});  
    } 
})

//login
app.post('/login', async(req, res) => {
    try {
        const {role,email, password} = req.body;
        let userindata;
        if(role == "admin"){
            userindata = await Admin.findOne({email});
        }else{
            userindata =await User.findOne({email});
        }
        if(!userindata){
          return  res.json({success: false, message: "user not found"})
        } 
        const auth = await bcrypt.compare(password, userindata.password);
        if(!auth){
            return res.json({success: false, message: "Password is incorrect"})
        }
        const token = createSecretToken(userindata._id);
        res.cookie("token", token, {
            withCredentials: true,
            httpOnly: false,
        });
        res.json({success: true, message: "User Logged in", token, role});   
    } catch (error) {
        res.json({success: false, message: "Something went wrong, try again"});  
    }
})


//add member
app.post('/addmember', verifyuser,async(req, res) => {
    try {
        const role = req.body.role;
        const email = req.body.email;
        if (role == 'admin') {
            let id = req.userdata;
            let adm = await Admin.findById(id);
            let mem = await User.findOne({email});
            if (!mem) {
              return  res.json({success: false, message: "Member not found"});  
            }
            adm.teammember.push(mem);
            adm.save();
            let admi = await Admin.findById(id).populate('teammember');
            res.json({success: true, message: "Member is added", admi});  
        } else {
            res.json({success: false, message: "A user cannot create a team"});  
        }
    } catch (error) {
        res.json({success: false, message: "Something went wrong, try again"});  
    }
})

//team page data
app.post('/teampage', verifyuser,async(req, res) => {
    try {
        const role = req.body.role;
        if (role == 'admin') {
            let id = req.userdata;
            let adm = await Admin.findById(id).populate('teammember');
            res.json({success: true, adm});  
        } else {
            res.json({success: false, message: "A user cannot create a team"});  
        }
    } catch (error) {
        res.json({success: false, message: "Something went wrong, try again"});  
    }
})

// task page
app.post('/taskpage',verifyuser, async(req, res) => {
    try {
        const role = req.body.role;
        let id = req.userdata;
        let userda;
        if(role == "admin"){
            userda = await Admin.findById(id).populate("teammember").populate('task');
        }else{
            userda = await User.findById(id).populate("task")
        }
        res.json({success: true, userda})
    } catch (error) {
        res.json({success: false, message: "A user cannot create a team"});  
    }
})

// add task
app.post('/addtask',verifyuser, async(req, res) => {
    try {
        const {auth , role, team, ...newtask} = req.body;
        let id = req.userdata;
        if(role == "admin"){
            let teamworker = [];
            for (let i = 0; i < team.length; i++) {
                let email = team[i];
                const teamuser = await User.findOne({email}) 
                teamworker.push(teamuser);
            }
            let latesttask = new Task(newtask);
            let admin = await Admin.findById(id);
            for (let i = 0; i < teamworker.length; i++) {
                const el = teamworker[i];
                latesttask.team.push(el);
            }
            admin.task.push(latesttask)
            await latesttask.save();
            await admin.save();
            for (let i = 0; i < teamworker.length; i++) {
                const email = teamworker[i].email;
                let userna = await User.findOne({email});
                const uid = userna._id;
                const allotedtask = await Task.findOne({team: new mongoose.Types.ObjectId(uid)})
                userna.task.push(allotedtask);
                await userna.save();
            }
            let userda;
            if(role == "admin"){
                userda = await Admin.findById(id).populate("teammember").populate('task');
            }else{
                userda = await User.findById(id).populate("task")
            }
            res.json({success: true, message:"task has been added", userda})
        }else{
            res.json({success: false, message: "A user cannot create a task"});  
        }
    } catch (error) {
        res.json({success: false, message: "some error occur, try again"});  
    }
})

//cards
app.post("/cards",async(req, res) => {
    try {
        let team = req.body.team;
        let user;
        let userarr = [];
        for (let i = 0; i < team.length; i++) {
            const id = team[i];
            user = await User.findById(id);
            userarr.push(user);

        }
        res.json({success:true, userarr});
    } catch (error) {
        res.json({success: false, message: "some error occur, try again"});  
    }
})

//dashboard
app.post("/dashboard", verifyuser, async(req,res) => {
    try {
        const role = req.body.role;
        let id = req.userdata;
        let userda;
        if(role == "admin"){
            userda = await Admin.findById(id).populate("teammember").populate('task');
        }else{
            userda = await User.findById(id).populate("task")
        }
        res.json({success: true, userda})
    } catch (error) {
        res.json({success: false, message: "A user cannot create a team"});  
    }
})

//showpage
app.post("/show/:id", verifyuser, async(req, res) => {
    try {
        const {id} = req.params;
        console.log("hii");
        const taskdata = await Task.findById(id).populate("team");
        console.log(taskdata)
        res.json({success:true, taskdata});
    } catch (error) {
        res.json({success: false, message: "A user cannot create a team"});
    }
})

//showpage
app.post("/status/:id", verifyuser, async(req, res) => {
    try {
        const {id} = req.params;
        const {auth, role, comment, status} = req.body;
        console.log(comment, status)
        const taskda = await Task.findByIdAndUpdate(id,{status});
        let taskcomment = await Task.findById(id);
        taskcomment.comment.push(comment);
        taskcomment.save();
        const taskdata = await Task.findById(id).populate("team");
        res.json({success:true, taskdata});
    } catch (error) {
        res.json({success: false, message: "A user cannot create a team"});
    }

})

//show member
app.post("/member/:id", verifyuser, async(req, res) => {
    try {
        const {id} = req.params;
        const member = await User.findById(id).populate("task");
        res.json({success:true, member});
    } catch (error) {
        res.json({success: false, message: "A user cannot create a team"});
    }
})
