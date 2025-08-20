const mongoose = require('mongoose');

function ConnectToDb(){
    mongoose.connect(process.env.MONGODB_URL).then(()=>{
        console.log('Connected To DB');
    })
    .catch((err)=>{
        console.log('There Was Some Error Connecting to DB',err);
    })
}

module.exports = ConnectToDb;