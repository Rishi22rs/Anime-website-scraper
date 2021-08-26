const express=require('express')
const { searchAnime, animeDetail } = require('../Controllers/controllers')
const router=express()

router.post('/searchAnime',searchAnime)
router.post('/animeDetail',animeDetail)

module.exports=router
