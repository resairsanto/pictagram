const {User, UserProfile, Post, PostTag, Tag} = require('../models')
const bcryptjs = require('bcryptjs')
const salt = bcryptjs.genSaltSync(10)

class UserController {
    static loginForm(req, res) {
        res.render("loginForm")
    }

    static login(req, res) {
        const { email, password } = req.body
        User.findOne({where: {email}})
        .then((user) => {
            if (user) {
                req.session.UserId = user.id
                const checkPassword = bcryptjs.compareSync(password, user.password)
                if (checkPassword) {
                    return res.redirect("/home/profile")
                } else {
                    const error = 'Invalid password'
                    return res.redirect(`/?errors=${error}`)
                }
            } else {
                const error = 'Invalid email'
                return res.redirect(`/?errors=${error}`)
            }
        })
        .catch((err) => {
            res.send(err)
        })
    }

    static formSignUp(req, res) {
        let {errors} = req.query
        if (errors) {
            errors = errors.split(",")
            return res.render("signUpForm", {errors})
        }
        res.render("signUpForm", {errors})
    }

    static addUser(req, res) {
        const{username, email, password} = req.body
        User.create({username, email, password})
        .then((user) => {
            req.session.UserId = user.id
            res.redirect('/home/profile/create')
        })
        .catch((err) => {
            if (err.name === "SequelizeValidationError") {
                let errors = ['', '', '']
                err.errors.forEach(el => {
                    errors.push(el.message)
                    // console.log(el.instance.username, el.instance.email, el.instance.password)
                    // if (el.instance.username.length === '') {
                    //     errors[0] = el.message
                    // } else if (el.instance.email === '') {
                    //     errors[1] = el.message
                    // } else if (el.instance.password === '') {
                    //     errors[2] = el.message
                    // }
                });
                res.redirect(`/signUp?errors=${errors}`)
                // res.send(err.errors)
            } else {
                res.send(err)
            }
        })
    }

    static logout(req, res) {
        req.session.destroy((err) => {
            if (err) return res.send(err)
        })
        res.redirect('/')
    }
}

module.exports = UserController