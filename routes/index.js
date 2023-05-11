const router = require('express').Router()
const Pictagram = require('../controllers/pictagram')
const User = require('../controllers/user')

router.get('/login', User.loginForm)
router.post('/login', User.login)
router.get('/signUp', User.formSignUp)
router.post('/signUp', User.addUser)
router.get('/logout', User.logout)

router.get('/home/', Pictagram.home)
router.get('/home/profile/:id', Pictagram.profile)
router.get('/home/:id/post', Pictagram.formAddPosting)
router.post('/home/:id/post', Pictagram.addPost)
router.get('/home/:id/edit', Pictagram.formEdit)
router.post('/home/:id/edit', Pictagram.formEdit)
router.get('/home/:id/delete/:PostId', Pictagram.delete)

module.exports = router