var express = require('express');
var router = express.Router();
var cloginlib=require('../backend/libs/cloginlib');
const session=require('express-session');
var registerlib=require('../backend/libs/registerlib')
const path=require('path');
const app = require('../app');
const register = require('../backend/model/register');
const kiranaregisterlib=require('../backend/libs/kiranaregisterlib');
const ologinlib=require('../backend/libs/ologinlib');
const ownerlibs=require('../backend/libs/ownerlibs');
const customerlib = require('../backend/libs/customerlib');
const { route } = require('./users');
/* GET home page. */



router.get('/', function(req, res) {

});

router.get('/logout',function(req,res)
{

    req.session.user={};
    res.send("logged out");
})





router.post('/kirana/register',function(req,res)
{
    console.log("call landed");
    kiranaregisterlib.registerowner(req.body,function(response)
    {
    if(response.success)
    {
        req.session.user={user:response.user,userid:response.userid,role:'owner'};

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
        req.session.user={user:response.user,userid:response.userid,role:'customer'};

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
                req.session.user={user:response.user,userid:response.userid,role:"customer"};
        
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

cloginlib.isvalid(req.body,function(response)
 {
     if(response.success)
     {
        req.session.user={user:response.user,userid:response.userid,role:'customer'};
        console.log(req.session.user);
         res.json({user:response.user,userid:response.userid,role:'customer'})
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
console.log('owner login');
console.log("call landed");

 ologinlib.isvalid(req.body,function(response)
 {
     if(response.success)
     {
        req.session.user={user:response.user,userid:response.userid,role:'owner'};
        console.log(req.session.user);
         res.json({user:response.user,userid:response.userid,role:"owner"});
         
     }
     else
     {
         res.send(false)
     }


})

})






router.post("/addproduct",function(req,res)
{
    console.log('addproduct landed');
    console.log(req.body);
   ownerlibs.addproduct(req.body,function(data)
   {
       console.log(data);
       res.json(data);
   })
})



router.get('/owner/myproducts:user',function(req,res)
{
    console.log("from index.js my products"+req.params.user);
    ownerlibs.getproducts({name:req.params.user},function(datax)
    {
        console.log(datax);
        res.json(datax);
    })


})


router.get("/getshops",function(req,res)
{
    customerlib.getshops(function(x)
    {
        res.json(x);
    })

    console.log("call landed in get shops");
    
})


router.post("/customer/kart",function(req,res)
{

    customerlib.addtocart(req.body,function(data)
    {

        res.send("added successfrully")

    })    
})


router.get("/customer/getkart:username",function(req,res)
{
    customerlib.getKartproducts(req.params.username,function(data)
    {
        res.json(data);
    })
})


router.post("/order",function(req,res)
{
    // console.log(req.body);

    customerlib.order(req.body,function(data)
    {

        res.send("added successfrully")

    })    
})


router.get("/customer/getorders:username",function(req,res)
{
    customerlib.getorderproducts(req.params.username,function(data)
    {
        res.json(data);
    })
})



//////////////////////////////////////

router.post("/owner/order",function(req,res)
{
    // console.log(req.body);

    ownerlibs.order(req.body,function(data)
    {
        console.log(JSON.stringify(data));

        res.send("added successfrully")

    })    
})



router.get("/owner/getorders:name",function(req,res)
{
    ownerlibs.getorderproducts(req.params.name,function(data)
    {
        res.json(data);
    })
})











module.exports = router;
