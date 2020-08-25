const passport = require('passport')

const router = require('express').Router()
// const passport = require('passport')

// @desc Authenticate with Google
// @route GET /auth/google
router.get('/google', passport.authenticate('google', { scope: ['profile'] }))

// @desc Google auth callback
// @route GET /auth/google/callback
router.get(
  '/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/',
  }),
  (req, res) => {
    res.redirect('/dashboard')
  }
)

// @desc Log out user
// @route  GET /auth/logout
router.get('/logout', (req, res) => {
  req.logout()
  res.redirect('/')
})

module.exports = router
