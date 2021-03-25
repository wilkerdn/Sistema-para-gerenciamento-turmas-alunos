const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/escola', {
    useNewUrlParser : true, 
    useUnifiedTopology: true
})

module.exports = mongoose