const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/TT",{
   useNewUrlParser:true,
   useUnifiedTopology:true,
//    useCreateIndex:true
}).then(()=>{
    console.log("db");
}).catch((e)=>{
    console.log(e);
})

