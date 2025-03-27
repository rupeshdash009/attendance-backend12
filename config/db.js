const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://rupeshdash20:2W4LNi93lZk93mBd@cluster0.gt8be.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('Error connecting to MongoDB', err);
});