var model=require('../model/admin');
var x=[]
module.exports={

    addproduct: async function(data,cb)
    {
        o=await model.findOne({name:data.name})
        o.products.push(data);
        console.log(o.products.length);
        o1=await model.updateOne({name:data.name},{$set:{products:o.products}})
        return cb(o1);
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