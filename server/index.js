const express = require('express')
const app = express();

const cookieParser = require('cookie-parser');
const cors = require('cors');
require('dotenv').config();

// connection to DB and cloudinary
const { connectDB } = require('./config/database');
// const { cloudinaryConnect } = require('./config/cloudinary');

// routes
const userRoutes = require('./routes/user');
// const profileRoutes = require('./routes/profile');
// const courseRoutes = require('./routes/course');


// middleware 
app.use(express.json()); // to parse json body
app.use(cookieParser());
app.use(
    cors({
        origin: 'http://localhost:3000', // frontend link
        credentials: true
    })
);
// app.use(
//     fileUpload({
//         useTempFiles: true,
//         tempFileDir: '/tmp'
//     })
// )


const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
    console.log(`Server Started on PORT ${PORT}`);
});

// connections
connectDB();

// mount route
app.use('/api/v1/auth', userRoutes);
// app.use('/api/v1/profile', profileRoutes)
// app.use('/api/v1/course', courseRoutes);




// Default Route
app.get('/', (req, res) => {
    // console.log('Your server is up and running..!');
    res.send(`<div>
    This is Default Route  
    <p>Everything is OK</p>
    </div>`);
})