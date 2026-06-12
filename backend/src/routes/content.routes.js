const express = require('express')
const router = express.Router()

const {
  getCategories,
  createCategory,
  deleteCategory,

  getHashtags,
  createHashtag,
  deleteHashtag,

  getMedia,
  createMedia,
  searchMediaByHashtag,
  deleteMedia,

  getCompetitions,
  createCompetition,
  deleteCompetition,

  getTeams,
  getTeamsByCompetition,
  createTeam,
  deleteTeam
} = require('../controllers/content.controller')

/* Categories */
router.get('/categories', getCategories)
router.post('/categories', createCategory)
router.delete('/categories/:id', deleteCategory)

/* Hashtags */
router.get('/hashtags', getHashtags)
router.post('/hashtags', createHashtag)
router.delete('/hashtags/:id', deleteHashtag)

/* Media */
router.get('/media', getMedia)
router.post('/media', createMedia)
router.get('/media/search', searchMediaByHashtag)
router.delete('/media/:id', deleteMedia)

/* Competitions */
router.get('/competitions', getCompetitions)
router.post('/competitions', createCompetition)
router.delete('/competitions/:id', deleteCompetition)

/* Teams */
router.get('/teams', getTeams)
router.get(
  '/teams/competition/:competitionId',
  getTeamsByCompetition
)
router.post('/teams', createTeam)
router.delete('/teams/:id', deleteTeam)

module.exports = router