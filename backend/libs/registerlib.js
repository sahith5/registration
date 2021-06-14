var model=require('../model/register');

module.exports={
    register:function(data,cb)
    {
        var response={error:"error",success:true,user:"user",userid:"userid"};

        model.create(data,function(err,data)
        {
           if(err)
           {
            response.success=false;
            response.error=err;
            return cb(response);
           }
           else{
               
            response.success=true;
            response.user=data.username;
            response.userid=data._id;
            return cb(response);

           }   
        }
        )



    }
}