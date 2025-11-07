require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const slaveRoutes = require('./routes/route.js');

const app = express();
app.use(express.json());

// MongoDB Atlas kapcsolat
mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Database connected'))
.catch(err => console.log(err));

// Route-ok
app.use('/api/slaves', slaveRoutes);

app.get('/', (req, res) => {
    res.json({ message: 'Helló, az API működik!' });
});

app.listen(3000, () => console.log('A szerver fut a 3000-es porton...'));
