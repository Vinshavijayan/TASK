let mongoose = require ('mongoose');
let schema = mongoose.Schema;



let PostSchema = new schema({

    Title:{
        type:String,
        required:true
    },
    Description:{
        type:String,
        required:true
    },
    Image:{
        type:String,
        required:true
    }

})

let Post_lst = mongoose.model('Post_lst',PostSchema)

module.exports=Post_lst