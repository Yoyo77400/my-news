const mongoose = require('mongoose');

const connectionString = process.env.MONGO_URL;

mongoose.connect(connectionString, {connectTimeOutMS:2000}).then(()=>{
    console.log('Connecté à MongoDB')
})

.catch(error => console.error(error));