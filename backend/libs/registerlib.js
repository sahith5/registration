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
            console.log(data);
            response.success=true;
            response.user=data.username;
            response.userid=data._id;
            return cb(response);

           }   
        }
        )
    },   
    ispresernt:function(data,cb)
    {

        var response={error:"error",success:true,user:"user",userid:"userid"};

        model.find({email:data.email},function(err,data)
        {

            if(err)
            {
                return cb(false);
            }


            if(data.length==1)
            { 
                
                console.log(data);
                response.success=true;
                response.user=data[0].username;
                response.userid=data[0]._id;
                console.log(response);
                return cb(response);
            }
            else{
                response.success=false;
                return cb(response);
            }
        })
    }
}