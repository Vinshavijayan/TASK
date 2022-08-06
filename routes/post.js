const express = require("express")
const auth = require("../middleware/auth");
const { addPostData,getAllPostData,getPostDatabyID,getPostDatabyIDandUpdate,getPostDatabyIdandDelete } = require("../controllers/post")

const post = require("../models/post")
const router = express.Router()


router.post('/',auth,addPostData)
router.get('/all',getAllPostData)
router.get('/:id',auth,getPostDatabyID)
router.put('/:id',auth,getPostDatabyIDandUpdate)
router.delete('/:id',auth,getPostDatabyIdandDelete)




module.exports = router