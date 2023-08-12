const mongoose  = require('mongoose');
require('dotenv').config(); 

const mongoURI = process.env.DATABASE_URL;

const connectionParam = {
    useNewUrlParser : true,
    useUnifiedTopology: true,
    useUnifiedTopology: true,
    
}
const connectToMongo = ()=>{
    mongoose.connect(mongoURI,connectionParam).then(()=>{
        console.log("connected to mongo succesfully");
    }).catch((e)=>console.log(e));
}

module.exports = connectToMongo;

