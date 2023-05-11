const { User, UserProfile, Post, PostTag, Tag } = require('../models')

class Pictagram {
    static home(req, res) {
        res.send("hello world!")
    }

    static readProfile(req, res) {
        const { UserId } = req.session
        const {explore} = req.query
        let userProfile;
        if (explore) {
            UserProfile.findOne({ where: { UserId } })
                .then((data) => {
                    userProfile = data
                    return Post.findAll()
                })
                .then((post) => {
                    res.render("home", { post, userProfile })
                })
                .catch((err) => {
                    res.send(err)
                })
        } else {
            UserProfile.findOne({ where: { UserId } })
                .then((data) => {
                    userProfile = data
                    return Post.findAll({ where: { UserId } })
                })
                .then((post) => {
                    res.render("home", { post, userProfile })
                })
                .catch((err) => {
                    res.send(err)
                })
        }
    }

    static formAddPosting(req, res) {
        Tag.findAll()
            .then((tags) => {
                res.render("addPostForm", { tags })
            })
            .catch((err) => {
                res.send(send)
            })
    }

    static formAddProfile(req, res) {
        res.render("addProfileForm")
    }

    static addProfile(req, res) {
        const { UserId } = req.session
        const { fullName, profilePicture, bio } = req.body
        UserProfile.create({ fullName, profilePicture, bio, UserId })
            .then(() => {
                res.redirect('/home/profile')
            })
    }

    static addPost(req, res) {
        const { UserId } = req.session
        let { caption, imageUrl, TagId } = req.body
        if (req.file.filename) {
            let filename = req.file.filename
            imageUrl = filename
        }
        Post.create({ caption, imageUrl, UserId })
            .then((data) => {
                const PostId = data.id
                return PostTag.create({ PostId, TagId })
            })
            .then(() => {
                res.redirect("/home/profile")
            })
            .catch((err) => {
                res.send(err)
            })
    }

    static formEdit(req, res) {
        const { PostId } = req.params
        let post;
        let tags;
        Post.findByPk(PostId)
            .then((data) => {
                post = data
                return Tag.findAll()
            })
            .then((data) => {
                tags = data
                return PostTag.findOne({ where: { PostId } })
            })
            .then((tag) => {
                res.render("editPostForm", { post, tags, tag })
            })
            .catch((err) => {
                res.send(err)
            })
    }

    static updatePost(req, res) {
        const { UserId } = req.session
        const { caption, imageUrl, TagId } = req.body
        const { PostId } = req.params
        console.log(caption, imageUrl, UserId, TagId)
        Post.update({ caption, imageUrl, UserId }, { where: { id: PostId } })
            .then(() => {
                return PostTag.update({ PostId, TagId }, { where: { PostId } })
            })
            .then(() => {
                res.redirect('/home/profile')
            })
            .catch((err) => {
                res.send(err)
            })
    }

    static delete(req, res) {
        const { PostId } = req.params
        PostTag.destroy({ where: { PostId } })
            .then(() => {
                res.redirect('/home/profile')
            })
            .then(() => {
                Post.destroy({ where: { id: PostId } })
            })
            .catch((err) => {
                res.send(err)
            })
    }
}

module.exports = Pictagram