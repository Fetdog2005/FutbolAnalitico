const express = require('express')
const router = express.Router()

const {
  getNews,
  getNewsBySlug,
  createNews,
  updateNews,
  deleteNews,
  getNewsById,
} = require('../controllers/news.controller')

router.get('/', getNews)
router.get('/:slug', getNewsBySlug)
router.post('/', createNews)
router.put('/:id', updateNews)
router.delete('/:id', deleteNews)
router.get('/id/:id', getNewsById)
module.exports = router