const mongoose=require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const SupervisorSchema =new Schema({

    title:{
        type:String,
        required:true
    },

    name:{
        type:String,
        required:true,
    },
    
    email: {
        type: String,
        required: true,
        unique: true,
        match: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    },

    fields:{
        type:[String],
        required:true
    },
    
    phoneno:{
        type:Number,
        required:true,
        match: /^(?:7|0|(?:\+94))[0-9]{9,10}$/
    },

    password: {
        type: String,
        required: true,
        minlength: 8,
        select: false
    },


    imgUrl: {
        type: String,
        required: false
    },

    profilePicture:{
        type:String,
        required:false
    },

})

SupervisorSchema.pre("save", async function(next){
    //checking if the password is already hashed
    if (!this.isModified("password")){
        next();
    }

    //hashing
    this.password = await bcrypt.hash(this.password, 12);
    next();
})

const Supervisor = mongoose.model("supervisor",SupervisorSchema)
module.exports= Supervisor
