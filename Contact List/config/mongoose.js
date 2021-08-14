const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/contact_list_db', {useNewUrlParser: true, useUnifiedTopology: true});

const db =mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log("Sucessfully Connected to Database");
});
