const userModel=require("../model/register");
const mongoose=require('mongoose');


module.exports={
    isvalid:function(obj,cb)
    {
        var username=obj.username;
        var password=obj.password;

        var response={success:true,user:"user",userid:"userid"};

        userModel.find({username:username,password:password},function(err,datax)
        {


            console.log(datax);

            if(datax.length==1)
            {

                console.log(datax)
               
response.success=true;
response.user=datax[0].username;
response.userid=datax[0]._id;

                return cb(response);
            }
            else
            {
                response.success=false;

                console.log("password is not matching")
                return cb(response);
            }
        })
    }
}