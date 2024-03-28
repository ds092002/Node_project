const express = require('express');
require('dotenv').config();
const app = express();
const mongoose = require('mongoose');
const port = process.env.PORT;
const morgan = require('morgan');
const path = require('path');

let imagePath = path.join(__dirname, 'public','images')
app.use(express.json());
app.use(morgan("dev"));
app.use('/public/images', express.static(imagePath));

/*----------------Admin Routes----------------*/
const adminRoutes = require('./routes/admin/index.routes');
app.use('/api/admin', adminRoutes);

/*----------------Users Routes----------------*/
const usersRoute = require('./routes/user/index.routes') 
app.use('/api/user', usersRoute);

app.listen(port, async () => {
    mongoose.connect(process.env.MONGO_DB_URL)
    .then(() => console.log('DB is Connected Successfully.....👍🏻'))
    .catch(error => console.log(error.message));
    console.log(`Server Start at http://localhost:${port}`);
}); 