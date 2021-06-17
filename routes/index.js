var express = require('express');
var router = express.Router();
var loginlib=require('../backend/libs/cloginlib');
const session=require('express-session');
var registerlib=require('../backend/libs/registerlib')
const path=require('path');
const app = require('../app');
const register = require('../backend/model/register');
const kiranaregisterlib=require('../backend/libs/kiranaregisterlib');
const oliginlib=require('../backend/libs/ologinlib');

/* GET home page. */



router.get('/', function(req, res) {

});

router.get('/logout',function(req,res)
{





})





router.post('/kirana/register',function(req,res)
{
    console.log("call landed");
    kiranaregisterlib.registerowner(req.body,function(response)
    {
    if(response.success)
    {
        req.session.user={user:response.user,userid:response.userid};

        res.json({success:true,user:response.user,userid:response._id,role:"owner"});
    }
    else
    {
        res.json({success:false,error:response.error});

    }
    
    }
    )
})







router.post('/register',function(req,res)
{
    console.log("call landed");
    registerlib.register(req.body,function(response)
    {
    if(response.success)
    {
        req.session.user={user:response.user,userid:response.userid};

        res.json({success:true,user:response.user,userid:response._id,role:'customer'});
    }
    else
    {
        res.json({success:false,error:response.error});

    }
    
    }
    )
})


////



router.post('/google/login',function(req,res)
{
    console.log("call landed");


//username:username,role:'user',email:email
    

// req.session.user={user:req.username};

// res.send(true);


    registerlib.ispresernt({email:req.body.email},function(response)
    {
        if(response.success)
        {
            req.session.user={user:response.user,userid:response.userid};
            res.json({success:true,user:response.user,userid:response._id})
        }
        else
        {
            registerlib.register(req.body,function(response)
            {
            if(response.success)
            {
                req.session.user={user:response.user,userid:response.userid};
        
                res.json({success:true,user:response.user,userid:response._id,role:"customer"});
            }
            else
            {
                res.json({success:false,error:response.error});
        
            }
            })
        }

    })
})





/////////////////////////////////////////////////
router.post("/login",function(req,res)
{

console.log("call landed");

 ologinlib.isvalid(req.body,function(response)
 {
     if(response.success)
     {
        req.session.user={user:response.user,userid:response.userid};
        console.log(req.session.user);
         res.json({user:response.user,userid:response.userid})
     }
     else
     {
         res.send(false)
     }


})

})



/////////////////////////////////////////////////
router.post("/owner/login",function(req,res)
{

console.log("call landed");

 loginlib.isvalid(req.body,function(response)
 {
     if(response.success)
     {
        req.session.user={user:response.user,userid:response.userid};
        console.log(req.session.user);
         res.json({user:response.user,userid:response.userid})
         
     }
     else
     {
         res.send(false)
     }


})

})




module.exports = router;
