const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://Taufeeque:Alam@cluster0.hfbcx.mongodb.net/my_db', (err, res) => {
    if (err) {
        console.log("Oops! Database is not Connected.", err)
    } else {
        console.log("Database is connected Successfully !!!")

    }
})
