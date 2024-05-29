const mongoose = require('mongoose');

const db = async () => {
    try {
        mongoose.set('strictQuery', false)
        await mongoose.connect(process.env.MONGOURL)
        console.log('Db Connection established')
    } catch (error) {
        console.log(error)
        console.log('DB Connection Error');
    }
}

module.exports = {db}