const express = require("express")
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const cors = require("cors");
dotenv.config()

const app=express()
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
}));

app.use(express.json());

mongoose.connect(process.env.url).then(()=>{
    console.log("db connected")
})
.catch((err)=>console.log(err))

const User=require("./register")

// app.post("/login", async (req,res)=>{
//     const {email,password} = req.body
//     const luser=await User.findOne({email: email})
//     .then(luser =>{
//         if(luser)
//         {
//             if(luser.password=== password){
//                 res.json("success")
//             }
//             else{
//                 res.json("pass is incorect")
//             }
//         }
//         else{
//             res.json("no user exits")
//         }
//     })
//     .catch(err => res.json(err))
// })
app.get("/show", async (req,res)=>{
    const users=await User.find()
    .then(users => res.json(users))
    .catch(err => res.json(err))
})

app.post("/register", async (req,res)=>{
    const users=await User.create(req.body)
    .then(users => res.json(users))
    .catch(err => res.json(err))
})

app.patch("/update/:id", async (req,res)=>
{
    try{
        const {id} = req.params;
        const users = await User.findByIdAndUpdate(id , req.body);
        if(!users)
        {
            res.status(404).json({message: 'not found'})

        }

        res.status(200).json({message: 'success',allusers: users})
    }
    catch(err){
        res.status(500).json({message: err.message})
    }
})

app.get("/",(req,res)=>{
    res.json({"hello":"hii"})
})

app.listen(3000, "0.0.0.0", () => {
  console.log("Server running on network");
});


