const mongoose=require('mongoose');


var schema=mongoose.Schema(
    {   email:{type:String,required:true,unique:true},
        name:{type:String,required:true,unique:true},
        shopname:String,
        password:String,
        products:[
            {
                productname:String,
                picurl:String,
                quanitity:Number,
                price:Number,
                mfgdate:Date,
                expdate:Date,
                discription:String,
            }
        ],
        orders:[
                {name:String,
                producturl:String,
                productname:String,
                price:Number,   
            }
        ]

    }
)



module.exports=mongoose.model('shops',schema);

