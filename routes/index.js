const router = require('express').Router()
const Controller = require('../controllers')

router.get('/login', Controller.loginForm)
router.post('/login', Controller.login)
router.get('/signUp', Controller.formSignUp)
router.post('/signUp', Controller.addUser)
router.get('/logout', Controller.logout)

router.get('/home/', Controller.home)
router.get('/home/profile/:id', Controller.profile)
router.get('/home/:id/post', Controller.formAddPosting)
router.post('/home/:id/post', Controller.addPost)
router.get('/home/:id/edit', Controller.formEdit)
router.post('/home/:id/edit', Controller.formEdit)
router.get('/home/:id/delete/:PostId', Controller.delete)

module.exports = router