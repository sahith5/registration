const userModel=require("../model/admin");
const mongoose=require('mongoose');


module.exports={
    isvalid:function(obj,cb)
    {
        console.log(obj);
        var username=obj.name;
        var password=obj.password;
        
        console.log(username);
        console.log(password);

        var response={success:true,user:"user",userid:"userid"};

        userModel.find({name:username,password:password},function(err,datax)
        {


            console.log("owner details"+datax);

            if(datax.length==1)
            {

                console.log(datax)
                            
                response.success=true;
                response.user=datax[0].name;
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