// connect mongoose to DB

const mongoose = require('mongoose');

let connectionString = `mongodb+srv://lucaszemlin:${process.env.MONGO_PASS}@cluster0.eglicmo.mongodb.net/?retryWrites=true&w=majority`

mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// log when connected
mongoose.connection.once('open', ()=> {
    console.log('connected to DATABASE');
});