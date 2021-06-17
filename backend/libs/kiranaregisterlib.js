const mongoose = require('mongoose')

model=require('../model/admin')


module.exports={

    registerowner:function(obj,cb)
    {

        var response={error:"error",success:true,user:"user",userid:"userid"};

        model.create(obj,function(err,data)
        {
            if(err)
           {
            response.success=false;
            response.error=err;
            return cb(response);
           }
           else{
               console.log(data);
            response.success=true;
            response.user=data.name;
            response.userid=data._id;
            return cb(response);

           }   

        })
    }




}



