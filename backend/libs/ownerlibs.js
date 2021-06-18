var model=require('../model/admin');
var x=[]
module.exports={

    addproduct:function(data,cb)
    {
        model.find({name:data.name},function(err,documents)
        {
            
             x=documents[0].products
            x.push(data);
            console.log(documents[0].products+"comming from find in owner libs");
        })
        model.updateOne({name:data.name},{$set:{products:x}},function(err,documets)
        {
            console.log(+"comming from owner libs");
        })


    },
    getproducts:function(data,cb)
    {
        console.log(data);
        model.find({name:data.name},function(err,documents)
        {
            console.log("my products"+documents[0].products);
           return cb(documents[0].products);
        })

    }




}