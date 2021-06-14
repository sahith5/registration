const mongoose=require('mongoose');

const config=require('../congig/config')

module.exports={
    connect:mongoose.connect(config.connectionstring,{useNewUrlParser: true,useUnifiedTopology: true},function()
    {
        console.log("database is connnected");
    })
}


