const mongoose = require("mongoose");
try {
    mongoose.connect('mongodb://localhost:27017/Notomi');
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
  }
  