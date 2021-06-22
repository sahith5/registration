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
        o.cart.push(data);
        console.log(o.cart.length);
        o1=await customermodel.updateOne({username:data.username},{$set:{cart:o.cart}})
        return cb(o1);
    },




}
