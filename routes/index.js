const router = require('express').Router()
const Pictagram = require('../controllers/pictagram')
const User = require('../controllers/user')
const multer = require('multer')
const path = require('path')
const storage = multer.diskStorage({
  destination:(req, file, cb)=>{
    cb(null, 'Images')
  },
  filename:(req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname))
  }
})
const upload = multer({storage: storage})

router.get('/', User.loginForm)
router.post('/', User.login)
router.get('/signUp', User.formSignUp)
router.post('/signUp', User.addUser)
router.get('/home/profile/create', Pictagram.formAddProfile)
router.post('/home/profile/create', Pictagram.addProfile)

router.use(function(req, res, next) {
    if (!req.session.UserId) {
        const error = 'Silahkan login telebih dahulu!'
        res.redirect(`/?error=${error}`)
    } else {
        next()
    }
})

router.get('/home/post', Pictagram.formAddPosting)
router.post('/home/post', upload.single('imageUrl'), Pictagram.addPost)
router.get('/home/profile', Pictagram.readProfile)
router.get('/home/edit/:PostId', Pictagram.formEdit)
router.post('/home/edit/:PostId', Pictagram.updatePost)
router.get('/home/delete/:PostId', Pictagram.delete)
router.get('/logout', User.logout)

module.exports = router