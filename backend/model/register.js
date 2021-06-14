const mongoose=require('mongoose');
var schema=mongoose.Schema({
    email:{type:String,required:true,unique:true},
    username:{type:String,required:true,unique:true},
    role:{type:String,enum:['admin','user']},
    profilepicurl:String,
    password:String,
    isdeleted:Boolean,
    tasks:[String],
},
{
    timestamps:true
});
module.exports=mongoose.model("usertable",schema );