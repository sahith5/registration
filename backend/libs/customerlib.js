ownermodel=require('../model/admin')
customermodel=require('../model/register')

module.exports={
    getshops:function(cb)
    {
        ownermodel.find({},function(err,documents)
        {
            var x=[]

            for(let i=0;i<documents.length;i++)
            {
                var name=documents[i].name;
                var _id=documents[i]._id;
                var shopname=documents[i].shopname;
                x.push({
                    name:name,
                    _id:_id,
                    shopname:shopname


                })
            }
            return cb(x);

        })
    },
    addtocart: async function(data,cb)
    {
        o=await customermodel.findOne({username:data.username})
        o.cart.push(data)
        // console.log(o.cart+"from customerlibs");
        
        // o[0].cart.push(data);
        // console.log(o+"from customer libs")
        // console.log(o.cart.length);
        o1=await customermodel.updateOne({username:data.username},{$set:{cart:o.cart}})
        console.log(o1+"from customerlibs");

        return cb("added successfully");
    },
    getKartproducts:function(data,cb)
    {
        console.log(data);
        customermodel.find({username:data},function(err,documents)
        {
            console.log("my products"+documents[0].cart);
           return cb(documents[0].cart);
        })

    },


    order: async function(data,cb)
    {
        o=await customermodel.findOne({username:data.username})
        o.orders.push(data)
        // console.log(o.cart+"from customerlibs");
        
        // o[0].cart.push(data);
        // console.log(o+"from customer libs")
        // console.log(o.cart.length);
        o1=await customermodel.updateOne({username:data.username},{$set:{orders:o.orders}})
        console.log(o1+"from customerlibs");

        return cb("added successfully");
    },



    getorderproducts:function(data,cb)
    {
        console.log(data);
        customermodel.find({username:data},function(err,documents)
        {
            console.log("my products"+documents[0].orders);
           return cb(documents[0].orders);
        })

    },
    





}
