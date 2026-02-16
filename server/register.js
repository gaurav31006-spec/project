// const  mongoose = require("mongoose")

// const registerSchema = new mongoose.Schema({
//     name:String,
//      email:{
//             type: String,
//             unique: true,
//             require:true
//         },
//         password:String
// }, 
//     { timestamps:true })

// module.exports=mongoose.model("register",registerSchema)

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        title: String,
        time: String,
        like: String,
        repost: String,
        view: String,
        watchtime: String,
        reach: String,
        img: String,
        share: String,
        cmt:String,
        c1:String,
        c2:String,
        c3:String,
        c4:String,
        c5:String,
        p1:String,
        p2:String,
        p3:String,
        p4:String,
        p5:String,

       

    },
    { timestamps: true }
);

module.exports = mongoose.model("reel", userSchema);
