var express = require('express');
var router = express.Router();
var loginlib=require('../backend/libs/loginlib');
const session=require('express-session');
var registerlib=require('../backend/libs/registerlib')
const todolib=require('../backend/libs/todolib');

const path=require('path');
const app = require('../app');
const register = require('../backend/model/register');




/* GET home page. */



router.get('/', function(req, res) {

});

router.get('/logout',function(req,res)
{





})


router.post('/register',function(req,res)
{
    console.log("call landed");
    registerlib.register(req.body,function(response)
    {
    if(response.success)
    {
        req.session.user={user:response.user,userid:response.userid};

        res.json({success:true,user:response.user,userid:response._id})
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
    

req.session.user={user:req.username};

res.send(true);


    // registerlib.ispresernt({email:req.body.email},function(response)
    // {
    //     if(response.success)
    //     {
    //         req.session.user={user:response.user,userid:response.userid};
    //         res.json({success:true,user:response.user,userid:response._id})
    //     }
    //     else
    //     {
    //         registerlib.register(req.body,function(response)
    //         {
    //         if(response.success)
    //         {
    //             req.session.user={user:response.user,userid:response.userid};
        
    //             res.json({success:true,user:response.user,userid:response._id})
    //         }
    //         else
    //         {
    //             res.json({success:false,error:response.error});
        
    //         }
    //         })
    //     }

    // })
})






router.post("/login",function(req,res)
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

router.post('/addtodo',todolib.addtodo)




module.exports = router;
