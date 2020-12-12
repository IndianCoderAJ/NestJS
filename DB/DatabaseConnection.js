const mongoose = require('mongoose');

 exports.getDbConnection = () =>{
  db = mongoose.connect(process.env.MONGO_URL, 
  {
       useNewUrlParser: true,
        useUnifiedTopology: true, 
        useFindAndModify: false 
   })
    .then(() => {
        console.log('db is connected....');
    })
    .catch(err => {
        console.log('db is not connected', err);
});

}

