var model=require('../model/register');


module.exports={
    addtodo: async (req,res) =>{

        var x=await model.findOneAndUpdate({username:"sahith"},)
        console.log(x);
        x.push(req.body.tasks);
        var update
        res.send("updated")
    }
} 