//server/server.js
const express = require('express');
const cors = require('cors');

const mainRoutes = require('./routes/main.js');

const app = express();
app.use(cors());
app.use(express.json()); //to parse json requests


/*Routes---------------------------------------------------------*/
app.use('/', mainRoutes);




app.listen(5000, () => {
    console.log(`Server running on http://localhost:5000`);
});