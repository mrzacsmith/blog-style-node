const { model } = require('mongoose')

const router = require('express').Router()
const { ensureAuth, ensureGuest } = require('../middleware/auth.js')

const Story = require('../models/Story.js')

// @desc  Login/Landing page
// @route GET /
router.get('/', ensureGuest, (req, res) => {
  res.render('login', {
    layout: 'login',
  })
})

// @desc  Dashboard
// @route GET /dashboard
router.get('/dashboard', ensureAuth, async (req, res) => {
  try {
    const stories = await Story.find({ user: req.user.id }).lean()
    res.render('dashboard', {
      firstName: req.user.firstName,
      lastName: req.user.lastName,
      stories,
    })
  } catch (err) {
    console.log(err)
    res.render('error/500')
  }
})

module.exports = router
