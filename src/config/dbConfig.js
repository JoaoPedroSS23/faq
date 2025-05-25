const mongoose = require('mongoose');

mongoose.connect(process.env.DATABASE_QUERYSTRING);

mongoose.connection.on('connected', () => {
    console.log("Connected to Database")
})
mongoose.connection.on('error', (err) => {
  console.log('Database error '+err);
});