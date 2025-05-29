const mongoose = require('mongoose');

const query = process.env.DATABASE_QUERYSTRING;
const password = encodeURIComponent(process.env.DATABASE_PASSWORD)

let uri = query.replace('<db_password>', password);

mongoose.connect(uri);

mongoose.connection.on('connected', () => {
    console.log("Connected to Database")
})
mongoose.connection.on('error', (err) => {
  console.log('Database error '+err);
});

mongoose.Promise = global.Promise

module.exports = mongoose;