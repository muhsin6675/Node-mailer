const mongoose=require('mongoose')                  //step 8
const userSchema=mongoose.Schema({                  //step 9
    names:{
        type:String,
        required:[true,"username is required"],
        unique:true                   //u can only use one username once
    },code:{
         type:String,
         required:[true,"password required"]
    },otp:{
        type:Number
    },
    email:{
        type:String,required:[true,"email required"]
    }
})
module.exports=mongoose.model('newtable',userSchema)                 //step 10
//used to export userschema dats o the db named newtable