const user=''
const password=''
const db=''
module.exports = {
    mongoURL: `mongodb://${user}:${encodeURIComponent(password)}@localhost:27017/${db}`,
    secretOrKey: 'A1B2C3'
}