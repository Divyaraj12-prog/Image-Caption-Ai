require('dotenv').config();
const app = require('./src/app');
const ConnectToDb = require('./src/db/db');

ConnectToDb();

app.listen(3000,()=>{
    console.log('Server Started at Port 3000');
})