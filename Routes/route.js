const express=require('express')
const { searchAnime, animeDetail, playEpisode, recentRelease, newSeason, movies, popular,genre, webPlayEpisode, getFrontPageData } = require('../Controllers/controllers')
const router=express()

router.get('/getFrontPageData',getFrontPageData)
router.get('/recentRelease',recentRelease)
router.get('/newSeason',newSeason)
router.get('/movies',movies)
router.get('/popular',popular)
router.post('/genre',genre)
router.post('/searchAnime',searchAnime)
router.post('/animeDetail',animeDetail)
router.post('/playEpisode',playEpisode)
router.post('/webPlayEpisode',webPlayEpisode)

module.exports=router
