const bcryptjs = require('bcryptjs')
const salt = bcryptjs.genSaltSync(10)

function hashing(value) {
    return value = bcryptjs.hashSync(value, salt)
}

module.exports = hashing