const express = require('express');
const app = express();
const db = require('./utils/db-connection');
const router = require('./routes/dbRoutes');
const cors = require('cors');

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send('Backend is working');
});
app.use('/',router);




db.authenticate().then(()=>{
    console.log("Databse connected");
    app.listen(3000,()=>console.log('Server started at port 3000'));

}).catch(error=> {
    console.error('Database connection failed:', error);
})






