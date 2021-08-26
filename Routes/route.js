const express=require('express')
const { searchAnime, animeDetail, playEpisode } = require('../Controllers/controllers')
const router=express()

router.post('/searchAnime',searchAnime)
router.post('/animeDetail',animeDetail)
router.post('/playEpisode',playEpisode)

module.exports=router
