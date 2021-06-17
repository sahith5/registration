const mongoose=require('mongoose');


var schema=mongoose.Schema(
    {   email:String,
        name:String,
        shopname:String,
        password:String,
        products:[
            {
                productname:String,
                picurl:String,
                price:Number,
                mfgdate:Date,
                expdate:Date,
                discription:String,
            }
        ],
        orders:[
            {
                orederby:String,
                productordered:String,
            }
        ]

    }
)



module.exports=mongoose.model('shops',schema);

