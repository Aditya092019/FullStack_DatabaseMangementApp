const express = require('express');
const app = express();
const db = require('./utils/db-connection');
const router = require('./routes/dbRoutes');

app.use(express.json());
app.use('/',router);
db.sync().then(()=>{
    app.listen(3000,()=>console.log('Server started at port 3000'));
}).catch(error=> {
    console.error('Database connection failed:', error);
})





