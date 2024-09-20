const mongoose = require("mongoose");

const OfficerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
})

const OfficerModel = mongoose.model("officers", OfficerSchema);

module.exports = OfficerModel;