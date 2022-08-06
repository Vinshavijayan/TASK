const express = require("express")
const { addPostData,getAllPostData,getPostDatabyID,getPostDatabyIDandUpdate,getPostDatabyIdandDelete } = require("../controllers/post")

const post = require("../models/post")
const router = express.Router()


router.post('/',addPostData)
router.get('/all',getAllPostData)
router.get('/:id',getPostDatabyID)
router.put('/:id',getPostDatabyIDandUpdate)
router.delete('/:id',getPostDatabyIdandDelete)




module.exports = router