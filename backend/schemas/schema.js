const mongoose = require("mongoose");
const { Schema } = mongoose;

const portfolioSchema = new mongoose.Schema({  //'new mongoose.Schema' likho ya 'new Schema' likho

    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    subject: {
        type: String,
        required: true
    },
    massage: {
        type: String,
        required: true
    }
},
    {
        versionKey: false
    });

module.exports = mongoose.model("portfolio", portfolioSchema);