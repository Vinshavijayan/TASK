const Post_lst = require('../models/post');

//add post details

exports.addPostData = (req,res)=>{
    let data = {
        Title : req.body.Title,
        Description : req.body.Description,
        Image : req.body.Image
    }

    let newPostData = new Post_lst(data)

    newPostData.save().then(result=>{
        if(!result){
            res.status('404').json({
                message:'Data not found'
            })
        } else{
            res.status('200').json({
                message:'Post added Successfulyyy!!',
                result: result['_id']
            })
        }
    }).catch(err =>console.log(err))

}

//get all post details

exports.getAllPostData = (req,res)=>{
    Post_lst.find().then(result =>{
        if(!result){
            res.status('404').json({
                message:"cannot get result"
            })

        }else{
            res.status('200').json(result)
        }
    }).catch(err=>console.log(err))
}


//get post detail by id


exports.getPostDatabyID= (req,res)=>{
    Post_lst.findById(req.params.id).then(result=>{
        if(!result){
            res.status('404').json({
                message:'cannot find data by id'
            })
        }else{
            res.status('200').json(result)
        }
    }).catch(err=>console.log(err))
}


//get post detail by id and update


exports.getPostDatabyIDandUpdate=(req,res)=>{
    let data = {
        Title : req.body.Title,
        Description : req.body.Description,
        Image : req.body.Image
    }
    Post_lst.findByIdAndUpdate(req.params.id,data).then(result=>{
        if(!result){
            res.status('404').json({
                message:'cannot get data by id to update'
            })
        }else{
            res.status('200').json(result)
        }
    }).catch(err => console.log(err))
}

//get post detail by id and delete


exports.getPostDatabyIdandDelete=(req,res)=>{
    Post_lst.findByIdAndDelete(req.params.id).then(result=>{
        if(!result){
            res.status('404').json({
                message:"cannot find data by id to delete"
            })
        }else{
            res.status('200').json({
                message:"deleted selected data succesfullyy"
            })
        }
        })
    
}


