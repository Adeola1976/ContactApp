const moongoose  = require('mongoose');
const config  = require('config');
const db = config.get('mongoURI');


const connectDB = async () => {
       
    try {
          await   moongoose.connect(db, {
           useNewUrlParser:true,
           useCreateIndex:true,
           useFindAndModify:false,
           useUnifiedTopology: true 
           });
           console.log('db connected')}
           catch (err){
            console.error(err.message);process.exit(1)}
           }
           
   


module.exports = connectDB;